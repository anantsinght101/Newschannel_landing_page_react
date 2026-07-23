import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "npm:@aws-sdk/client-s3@^3.500.0";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@^3.500.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verify Authentication (JWT Token)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Valid active session required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Parse Request Body (fileName, fileType, fileSize)
    const { fileName, fileType, fileSize } = await req.json();
    if (!fileName) {
      return new Response(
        JSON.stringify({ error: "Bad Request: fileName is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const incomingFileSize = Number(fileSize) || 0;

    // 3. Read Cloudflare R2 Credentials from Edge Function Secrets
    const accountId = Deno.env.get("R2_ACCOUNT_ID");
    const accessKeyId = Deno.env.get("R2_ACCESS_KEY_ID");
    const secretAccessKey = Deno.env.get("R2_SECRET_ACCESS_KEY");
    const bucketName = Deno.env.get("R2_BUCKET_NAME");
    const publicBaseUrl = Deno.env.get("R2_PUBLIC_BASE_URL");

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicBaseUrl) {
      console.error("Missing R2 environment secrets in Edge Function");
      return new Response(
        JSON.stringify({
          error:
            "Server Configuration Error: Cloudflare R2 secrets are not configured in Supabase Edge Function environment.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Initialize S3 Client configured for Cloudflare R2
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // 5. Check R2 Storage Ceiling (Free-Tier Safety Limit)
    if (supabaseServiceKey) {
      const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

      let cachedTotalBytes = 0;
      let checkedAt: Date | null = null;

      const { data: usageData } = await serviceClient
        .from("storage_usage_cache")
        .select("id, total_bytes, checked_at")
        .eq("id", 1)
        .maybeSingle();

      if (usageData) {
        cachedTotalBytes = Number(usageData.total_bytes) || 0;
        checkedAt = usageData.checked_at ? new Date(usageData.checked_at) : null;
      }

      const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
      const now = new Date();

      // Refresh cache if older than 15 minutes or missing
      if (!checkedAt || now.getTime() - checkedAt.getTime() > FIFTEEN_MINUTES_MS) {
        let sumBytes = 0;
        let continuationToken: string | undefined = undefined;

        do {
          const listCmd = new ListObjectsV2Command({
            Bucket: bucketName,
            ContinuationToken: continuationToken,
          });
          const listResult = await s3Client.send(listCmd);
          if (listResult.Contents) {
            for (const obj of listResult.Contents) {
              sumBytes += obj.Size || 0;
            }
          }
          continuationToken = listResult.IsTruncated ? listResult.NextContinuationToken : undefined;
        } while (continuationToken);

        cachedTotalBytes = sumBytes;

        await serviceClient.from("storage_usage_cache").upsert({
          id: 1,
          total_bytes: cachedTotalBytes,
          checked_at: now.toISOString(),
        });
      }

      const projectedTotal = cachedTotalBytes + incomingFileSize;
      const ceilingStr = Deno.env.get("R2_STORAGE_CEILING_BYTES") ?? "8589934592"; // Default 8GB
      const ceilingBytes = Number(ceilingStr) || 8589934592;

      if (projectedTotal > ceilingBytes) {
        console.warn(`R2 Storage ceiling exceeded! Projected: ${projectedTotal}, Ceiling: ${ceilingBytes}`);
        return new Response(
          JSON.stringify({
            error: "storage_limit_reached",
            message:
              "Storage is near its free-tier limit. Contact the site owner before uploading more media.",
          }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Optimistically add incoming fileSize to cached total
      await serviceClient.from("storage_usage_cache").upsert({
        id: 1,
        total_bytes: cachedTotalBytes + incomingFileSize,
        checked_at: (checkedAt || now).toISOString(),
      });
    }

    // 6. Generate Server-Side Object Key (UUID + Extension)
    const fileExt = fileName.includes(".") ? fileName.split(".").pop() : "bin";
    const objectKey = `${crypto.randomUUID()}.${fileExt}`;

    // 7. Create PutObjectCommand & Presigned URL (5-minute expiration)
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: fileType || "application/octet-stream",
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    const cleanBaseUrl = publicBaseUrl.replace(/\/$/, "");
    const publicUrl = `${cleanBaseUrl}/${objectKey}`;

    // 8. Return presigned upload URL and final public URL
    return new Response(
      JSON.stringify({
        uploadUrl,
        publicUrl,
        objectKey,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error generating presigned upload URL:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
