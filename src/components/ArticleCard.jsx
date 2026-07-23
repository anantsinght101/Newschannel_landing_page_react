import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { formatTimeAgo } from "../utils/dateUtils";
import { getCategoryLabel } from "../utils/categoryUtils";
import thumb1 from "../assets/article-thumbnail-1.svg";

export default function ArticleCard({
  image,
  category,
  title,
  excerpt,
  to,
  publishedAt,
}) {
  const { lang, t } = useLanguage();
  const displayCategory = getCategoryLabel(category, lang);
  const timeLabel = publishedAt
    ? formatTimeAgo(publishedAt, lang)
    : t("recentTime");

  return (
    <li className="article-card">
      <Link to={to} className="article-card__link">
        <div className="article-card__image-wrapper">
          <img
            src={image || thumb1}
            alt={`Thumbnail for ${title}`}
            className="article-card__image"
            width="400"
            height="225"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = thumb1;
            }}
          />
        </div>
        <div className="article-card__body">
          <div className="article-card__meta">
            <span className="article-card__category">{displayCategory}</span>
            <span className="article-card__time">• {timeLabel}</span>
          </div>
          <h3 className="article-card__title">{title}</h3>
          <p className="article-card__excerpt">{excerpt}</p>
          <span className="article-card__cta">
            {t("readMore")} <span className="article-card__arrow">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
