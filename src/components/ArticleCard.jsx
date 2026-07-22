import { Link } from "react-router-dom";

/**
 * Modern Digital-First article card component.
 * Features 16:9 image container, outline category tag, clear headline contrast,
 * and navy-to-red read more interactive hover effect.
 */
export default function ArticleCard({ image, category, title, excerpt, to }) {
  return (
    <li className="article-card">
      <Link to={to} className="article-card__link">
        <div className="article-card__image-wrapper">
          <img
            src={image}
            alt={`Thumbnail for ${title}`}
            className="article-card__image"
            width="400"
            height="225"
            loading="lazy"
          />
        </div>
        <div className="article-card__body">
          <div className="article-card__meta">
            <span className="article-card__category">{category}</span>
          </div>
          <h3 className="article-card__title">{title}</h3>
          <p className="article-card__excerpt">{excerpt}</p>
          <span className="article-card__cta">
            वाचा अधिक <span className="article-card__arrow">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
