import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const title =
    pathname
      .split("/")
      .filter(Boolean)
      .join(" / ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) || t("home");

  return (
    <main id="main-content" className="page">
      <div>
        <span className="page__badge">News Yatra</span>
        <h1 className="page__title">{title}</h1>
        <p className="page__text">{t("pageNotFoundDesc")}</p>
        <Link to="/" className="page__back-link">
          {t("returnHome")}
        </Link>
      </div>
    </main>
  );
}
