/**
 * Utility to extract YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== "string") return null;

  const trimmedUrl = url.trim();

  // Regular expression to match standard YouTube URLs, shorts, embed, or shortlinks
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmedUrl.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return null;
}
