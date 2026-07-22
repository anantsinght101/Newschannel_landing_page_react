import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";
import ArticleCard from "./ArticleCard";
import { articles } from "../siteData";

const imageMap = {
  "article-thumbnail-1": thumb1,
  "article-thumbnail-2": thumb2,
  "article-thumbnail-3": thumb3,
  "article-thumbnail-4": thumb4,
  "article-thumbnail-5": thumb5,
  "article-thumbnail-6": thumb6,
};

/**
 * Grid/cards of news articles — sits where the live-stream player used to,
 * directly below the hero heading.
 */
export default function NewsGrid() {
  return (
    <section className="news-grid-section" aria-labelledby="news-grid-title">
      <div className="container">
        <h2 className="news-grid-section__title" id="news-grid-title">
          Latest Stories
        </h2>
        <ul className="article-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              image={imageMap[article.image]}
              category={article.category}
              title={article.title}
              excerpt={article.excerpt}
              to={article.to}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
