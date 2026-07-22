import { useState } from "react";
import { useNavigate } from "react-router-dom";
import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";
import MobileArticleCard from "./MobileArticleCard";
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

export default function MobileNewsGrid() {
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
    <section className="mobile-news-grid-section" aria-labelledby="mobile-grid-title">
      <div className="mobile-container">
        <h2 className="mobile-news-grid-section__title" id="mobile-grid-title">
          {sectionTitles.gridTitle[lang]}
        </h2>

        {/* 1 Card per row, 20px spacing */}
        <ul className="mobile-article-list">
          {articles.map((article) => (
            <MobileArticleCard
              key={article.id}
              image={imageMap[article.image]}
              category={article.category[lang]}
              title={article.title[lang]}
              excerpt={article.excerpt[lang]}
              to={article.to}
            />
          ))}
        </ul>

        {/* Upload News Button (Height ~44-48px) */}
        <div className="mobile-news-grid-section__upload-bar">
          <button
            type="button"
            className="mobile-upload-btn"
            onClick={handleUploadClick}
          >
            {uploadNewsModal.buttonText[lang]}
          </button>
        </div>
      </div>

      {/* Real Supabase Upload News Modal */}
      <UploadNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
