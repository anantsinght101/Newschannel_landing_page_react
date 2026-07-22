import { Link } from "react-router-dom";
import { sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function MobileArticleCard({ image, category, title, excerpt, to }) {
  const { lang } = useLanguage();

  return (
    <li className="mobile-article-card">
      <Link to={to} className="mobile-article-card__link">
        {/* Image: 100% width, 16:9 ratio, rounded corners */}
        <div className="mobile-article-card__image-wrapper">
          <img
            src={image}
            alt={title}
            className="mobile-article-card__image"
            loading="lazy"
          />
        </div>

        {/* Card Content Stack */}
        <div className="mobile-article-card__body">
          <div className="mobile-article-card__meta">
            <span className="mobile-article-card__category">{category}</span>
            <span className="mobile-article-card__time">• २ तासांपूर्वी</span>
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
