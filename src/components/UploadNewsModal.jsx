import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { getCategoryLabel } from "../utils/categoryUtils";
import { uploadNewsModal } from "../siteData";

export default function UploadNewsModal({ isOpen, onClose, onSuccess }) {
  const { lang, t } = useLanguage();

  const [headline, setHeadline] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const [validationError, setValidationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setCategoryError("");
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        setCategoryError(
          lang === "mr"
            ? `श्रेणी लोड करताना त्रुटी आली: ${error.message}`
            : `Error loading categories: ${error.message}`
        );
      } else {
        setCategories(data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategoryError(
        lang === "mr" ? "श्रेणी लोड करता आली नाही." : "Could not load categories."
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  const MAX_FILES = 5;
  const MAX_FILE_SIZE_MB = 25;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setValidationError("");

    if (selectedFiles.length > MAX_FILES) {
      setValidationError(t("maxFilesExceeded"));
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setValidationError(t("fileSizeExceeded"));
        return;
      }
    }

    setFiles(selectedFiles);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setHeadline("");
    setCategoryId("");
    setContent("");
    setYoutubeUrl("");
    setAuthor("");
    setFiles([]);
    setValidationError("");
    setSubmitError("");
    setUploadProgress("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSubmitError("");
    setUploadProgress("");
    setSuccessMessage("");

    if (!headline.trim()) {
      setValidationError(t("fillHeadlineError"));
      return;
    }

    if (!categoryId) {
      setValidationError(t("fillCategoryError"));
      return;
    }

    if (!content.trim()) {
      setValidationError(t("fillContentError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const mediaUrls = [];

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setUploadProgress(t("uploadingProgress"));

          let uploadedUrl = null;

          // 1. Attempt Cloudflare R2 Direct Upload via Supabase Edge Function
          try {
            const { data: edgeData, error: edgeError } = await supabase.functions.invoke(
              "generate-upload-url",
              {
                body: {
                  fileName: file.name,
                  fileType: file.type || "application/octet-stream",
                  fileSize: file.size || 0,
                },
              }
            );

            // Check if storage ceiling free-tier limit error occurred
            const isCeilingReached =
              edgeData?.error === "storage_limit_reached" ||
              edgeError?.message?.includes("storage_limit_reached") ||
              edgeError?.context?.json?.error === "storage_limit_reached" ||
              (edgeError && edgeError.status === 403);

            if (isCeilingReached) {
              setSubmitError(t("storageCeilingReached"));
              setIsSubmitting(false);
              setUploadProgress("");
              return; // Stop submission loop immediately!
            }

            if (!edgeError && edgeData?.uploadUrl) {
              const putResponse = await fetch(edgeData.uploadUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type || "application/octet-stream",
                },
                body: file,
              });

              if (putResponse.ok && edgeData.publicUrl) {
                uploadedUrl = edgeData.publicUrl;
              }
            }
          } catch (r2Error) {
            console.warn("R2 Upload failed, trying Supabase Storage fallback:", r2Error);
          }

          // 2. Fallback to Supabase Storage Bucket
          if (!uploadedUrl) {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const filePath = `articles/${fileName}`;

            const { error: storageError } = await supabase.storage
              .from("news-media-temp")
              .upload(filePath, file);

            if (!storageError) {
              const { data: publicData } = supabase.storage
                .from("news-media-temp")
                .getPublicUrl(filePath);
              if (publicData?.publicUrl) {
                uploadedUrl = publicData.publicUrl;
              }
            }
          }

          if (uploadedUrl) {
            mediaUrls.push(uploadedUrl);
          }
        }
      }

      setUploadProgress(
        lang === "mr"
          ? "डेटाबेसमध्ये बातमी सेव्ह होत आहे..."
          : "Saving news to database..."
      );

      // 3. Insert row into articles table with status: "published"
      const fullPayload = {
        headline: headline.trim(),
        category_id: categoryId,
        content: content.trim(),
        media_urls: mediaUrls,
        status: "published",
        published_at: new Date().toISOString(),
      };

      if (youtubeUrl.trim()) {
        fullPayload.youtube_url = youtubeUrl.trim();
      }
      if (author.trim()) {
        fullPayload.author = author.trim();
      }

      // Attempt insert with full payload
      let { error: dbError } = await supabase.from("articles").insert([fullPayload]);

      // Fallback: If DB throws PGRST204 schema cache error (meaning optional columns youtube_url or author aren't in Postgres yet), retry with core payload
      if (dbError && dbError.code === "PGRST204") {
        console.warn("Supabase schema missing optional columns (youtube_url / author). Retrying with core payload...");
        const corePayload = {
          headline: headline.trim(),
          category_id: categoryId,
          content: content.trim(),
          media_urls: mediaUrls,
          status: "published",
          published_at: new Date().toISOString(),
        };

        const { error: retryError } = await supabase.from("articles").insert([corePayload]);
        dbError = retryError;
      }

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw new Error(
          lang === "mr"
            ? `डेटाबेस सेव्ह त्रुटी: ${dbError.message}`
            : `Database save error: ${dbError.message}`
        );
      }

      setSuccessMessage(
        lang === "mr"
          ? "बातमी यशस्वीरीत्या सबमिट झाली आहे!"
          : "News article submitted successfully!"
      );

      setTimeout(() => {
        resetForm();
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Upload / DB Insert error:", err);
      setSubmitError(
        err.message ||
          (lang === "mr"
            ? "सबमिट करताना अनपेक्षित त्रुटी आली."
            : "An unexpected error occurred during submission.")
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {t("modalTitle")}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label={t("cancelBtn")}
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {validationError && (
            <div className="modal-alert modal-alert--error">{validationError}</div>
          )}

          {submitError && (
            <div className="modal-alert modal-alert--error">{submitError}</div>
          )}

          {uploadProgress && (
            <div className="modal-alert modal-alert--info">{uploadProgress}</div>
          )}

          {successMessage && (
            <div className="modal-alert modal-alert--success">{successMessage}</div>
          )}

          {/* Headline */}
          <div className="modal-form-group">
            <label htmlFor="headline" className="modal-label">
              {t("headlineLabel")} <span className="required-star">*</span>
            </label>
            <input
              id="headline"
              type="text"
              className="modal-input"
              placeholder={t("headlinePlaceholder")}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Category Dropdown */}
          <div className="modal-form-group">
            <label htmlFor="category" className="modal-label">
              {t("categoryLabel")} <span className="required-star">*</span>
            </label>
            <select
              id="category"
              className="modal-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              disabled={isSubmitting || loadingCategories}
            >
              <option value="">-- {t("categoryPlaceholder")} --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {getCategoryLabel(cat.slug || cat.name, lang)}
                </option>
              ))}
            </select>
            {categoryError && <p className="field-hint error">{categoryError}</p>}
          </div>

          {/* Article Content */}
          <div className="modal-form-group">
            <label htmlFor="content" className="modal-label">
              {t("contentLabel")} <span className="required-star">*</span>
            </label>
            <textarea
              id="content"
              className="modal-textarea"
              rows={6}
              placeholder={t("contentPlaceholder")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* YouTube Video URL */}
          <div className="modal-form-group">
            <label htmlFor="youtube-url" className="modal-label">
              {t("youtubeUrlLabel")}
            </label>
            <input
              id="youtube-url"
              type="url"
              className="modal-input"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Author Name */}
          <div className="modal-form-group">
            <label htmlFor="author-name" className="modal-label">
              {t("authorLabel")}
            </label>
            <input
              id="author-name"
              type="text"
              className="modal-input"
              placeholder={t("authorPlaceholder")}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Media File Upload */}
          <div className="modal-form-group">
            <label htmlFor="media-files" className="modal-label">
              {t("mediaLabel")}
            </label>
            <input
              id="media-files"
              type="file"
              className="modal-file-input"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            <p className="field-hint">{t("mediaHint")}</p>
            {files.length > 0 && (
              <ul className="selected-files-list">
                {files.map((file, idx) => (
                  <li key={idx}>
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="modal-btn modal-btn--secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {t("cancelBtn")}
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submittingBtn") : t("submitBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
