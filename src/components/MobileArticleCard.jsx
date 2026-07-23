import { Link } from "react-router-dom";
import { sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { formatTimeAgo } from "../utils/dateUtils";
import { getCategoryLabel } from "../utils/categoryUtils";
import thumb1 from "../assets/article-thumbnail-1.svg";

export default function MobileArticleCard({
  image,
  category,
  title,
  excerpt,
  to,
  publishedAt,
}) {
  const { lang } = useLanguage();
  const displayCategory = getCategoryLabel(category, lang);
  const timeLabel = publishedAt
    ? formatTimeAgo(publishedAt, lang)
    : lang === "mr"
    ? "नुकतेच"
    : "Recent";

  return (
    <li className="mobile-article-card">
      <Link to={to} className="mobile-article-card__link">
        <div className="mobile-article-card__image-wrapper">
          <img
            src={image || thumb1}
            alt={title}
            className="mobile-article-card__image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = thumb1;
            }}
          />
        </div>

        <div className="mobile-article-card__body">
          <div className="mobile-article-card__meta">
            <span className="mobile-article-card__category">{displayCategory}</span>
            <span className="mobile-article-card__time">• {timeLabel}</span>
          </div>

          <h3 className="mobile-article-card__title">{title}</h3>

          <p className="mobile-article-card__excerpt">{excerpt}</p>

          <span className="mobile-article-card__cta">
            {sectionTitles.readMoreCTA[lang]} <span className="arrow">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
