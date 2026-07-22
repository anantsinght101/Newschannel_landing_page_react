import { Link } from "react-router-dom";

/**
 * One reusable article card, fed different data per article.
 * Whole card is a real Link so the redirect works from the image, title, or button.
 */
export default function ArticleCard({ image, category, title, excerpt, to }) {
  return (
    <li className="article-card">
      <Link to={to} className="article-card__link">
        <img
          src={image}
          alt={`Thumbnail image for the article: ${title}`}
          className="article-card__image"
          width="400"
          height="240"
          loading="lazy"
        />
        <div className="article-card__body">
          <span className="article-card__category">{category}</span>
          <h3 className="article-card__title">{title}</h3>
          <p className="article-card__excerpt">{excerpt}</p>
          <span className="article-card__cta">Read more →</span>
        </div>
      </Link>
    </li>
  );
}
