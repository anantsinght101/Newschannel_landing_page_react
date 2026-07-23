/**
 * Utility functions for formatting publication dates and relative time in Marathi and English
 */

export function formatTimeAgo(dateInput, lang = "mr") {
  if (!dateInput) {
    return lang === "mr" ? "नुकतेच" : "Just now";
  }

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return lang === "mr" ? "नुकतेच" : "Just now";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return lang === "mr" ? "नुकतेच" : "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return lang === "mr"
      ? `${diffInMinutes} मिनिटांपूर्वी`
      : `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return lang === "mr"
      ? `${diffInHours} तासांपूर्वी`
      : `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return lang === "mr"
      ? `${diffInDays} दिवसांपूर्वी`
      : `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return lang === "mr"
      ? `${diffInMonths} महिन्यांपूर्वी`
      : `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return lang === "mr"
    ? `${diffInYears} वर्षांपूर्वी`
    : `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

export function formatFullDate(dateInput, lang = "mr") {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  try {
    const locale = lang === "mr" ? "mr-IN" : "en-US";
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (e) {
    return date.toLocaleDateString();
  }
}
