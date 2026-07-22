import { useState } from "react";
import { useNavigate } from "react-router-dom";
import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";
import ArticleCard from "./ArticleCard";
import UploadNewsModal from "./UploadNewsModal";
import { articles, sectionTitles, uploadNewsModal } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const imageMap = {
  "article-thumbnail-1": thumb1,
  "article-thumbnail-2": thumb2,
  "article-thumbnail-3": thumb3,
  "article-thumbnail-4": thumb4,
  "article-thumbnail-5": thumb5,
  "article-thumbnail-6": thumb6,
};

export default function NewsGrid() {
  const { lang } = useLanguage();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    if (session) {
      setIsModalOpen(true);
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <section className="news-grid-section" aria-labelledby="news-grid-title">
      <div className="container">
        <h2 className="news-grid-section__title" id="news-grid-title">
          {sectionTitles.gridTitle[lang]}
        </h2>

        <ul className="article-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              image={imageMap[article.image]}
              category={article.category[lang]}
              title={article.title[lang]}
              excerpt={article.excerpt[lang]}
              to={article.to}
            />
          ))}
        </ul>

        {/* Upload News Article Button (Placed directly below top stories grid) */}
        <div className="news-grid-section__upload-bar">
          <button
            type="button"
            className="upload-news-btn"
            onClick={handleUploadClick}
          >
            {uploadNewsModal.buttonText[lang]}
          </button>
        </div>
      </div>

      {/* Real Supabase Upload News Modal Component */}
      <UploadNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
