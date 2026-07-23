import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import MobileArticleCard from "./MobileArticleCard";
import UploadNewsModal from "./UploadNewsModal";
import { sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { useMobileDetector } from "../hooks/useMobileDetector";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { getCategoryLabel } from "../utils/categoryUtils";

// Import fallback thumbnails
import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";

const fallbackThumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

export default function DynamicNewsGrid() {
  const { lang } = useLanguage();
  const isMobile = useMobileDetector(768);
  const { session } = useAuth();
  const navigate = useNavigate();

  const [categoryStories, setCategoryStories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  // Upload modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch articles once on initial mount without re-triggering loading spinners on language toggle
  useEffect(() => {
    fetchTopCategoryStories();
  }, []);

  const fetchTopCategoryStories = async () => {
    setLoading(true);
    try {
      // 1. Fetch categories
      const { data: dbCategories } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", { ascending: true });

      // 2. Fetch published articles from database
      const { data: dbArticles } = await supabase
        .from("articles")
        .select("id, headline, content, media_urls, created_at, published_at, category_id, categories(id, name, slug)")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      // Map categories and group their published articles
      const categoryMap = new Map();
      if (dbCategories && dbCategories.length > 0) {
        dbCategories.forEach((cat) => {
          categoryMap.set(cat.id, {
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            articles: [],
          });
        });
      }

      if (dbArticles && dbArticles.length > 0) {
        dbArticles.forEach((art) => {
          if (categoryMap.has(art.category_id)) {
            categoryMap.get(art.category_id).articles.push(art);
          } else {
            const unknownKey = art.category_id || "general";
            if (!categoryMap.has(unknownKey)) {
              categoryMap.set(unknownKey, {
                id: unknownKey,
                name: art.categories?.name || " ताज्या बातम्या",
                slug: art.categories?.slug || "latest",
                articles: [],
              });
            }
            categoryMap.get(unknownKey).articles.push(art);
          }
        });
      }

      // Collect the single latest published article per category first
      const storiesList = [];
      const addedIds = new Set();

      categoryMap.forEach((catObj) => {
        if (catObj.articles.length > 0) {
          const latestArt = catObj.articles[0];
          storiesList.push({
            id: latestArt.id,
            categorySlug: latestArt.categories?.slug || catObj.slug || "latest",
            title: latestArt.headline,
            excerpt: latestArt.content ? latestArt.content.substring(0, 140) + "..." : "",
            image:
              latestArt.media_urls && latestArt.media_urls.length > 0
                ? latestArt.media_urls[0]
                : fallbackThumbnails[storiesList.length % 6],
            publishedAt: latestArt.published_at || latestArt.created_at,
            to: `/article/${latestArt.id}`,
          });
          addedIds.add(latestArt.id);
        }
      });

      // Append remaining published articles from DB so all uploaded articles are showcased
      if (dbArticles && dbArticles.length > 0) {
        dbArticles.forEach((art) => {
          if (!addedIds.has(art.id)) {
            storiesList.push({
              id: art.id,
              categorySlug: art.categories?.slug || "latest",
              title: art.headline,
              excerpt: art.content ? art.content.substring(0, 140) + "..." : "",
              image:
                art.media_urls && art.media_urls.length > 0
                  ? art.media_urls[0]
                  : fallbackThumbnails[storiesList.length % 6],
              publishedAt: art.published_at || art.created_at,
              to: `/article/${art.id}`,
            });
            addedIds.add(art.id);
          }
        });
      }

      setCategoryStories(storiesList);
    } catch (err) {
      console.error("Error loading top stories:", err);
      setCategoryStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleUploadClick = () => {
    if (session) {
      setIsModalOpen(true);
    } else {
      navigate("/admin/login");
    }
  };

  const visibleStories = categoryStories.slice(0, visibleCount);
  const hasMoreStories = visibleCount < categoryStories.length;

  return (
    <section
      className={isMobile ? "mobile-news-grid-section" : "news-grid-section"}
      aria-labelledby="news-grid-title"
    >
      <div className={isMobile ? "mobile-container" : "container"}>
        {/* Boxed Section Title Header */}
        <div className="news-grid-section__header-box">
          <span className="grid-header-accent-dot" />
          <h2
            className={isMobile ? "mobile-news-grid-section__title" : "news-grid-section__title"}
            id="news-grid-title"
          >
            {sectionTitles.gridTitle[lang]}
          </h2>
        </div>

        {loading ? (
          <div className="news-grid-loading">
            <div className="spinner-loader" />
            <p>{lang === "mr" ? "बातम्या लोड होत आहेत..." : "Loading stories..."}</p>
          </div>
        ) : categoryStories.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon">📰</div>
            <h3>
              {lang === "mr"
                ? "या विभागात अद्याप कोणतीही बातमी उपलब्ध नाही."
                : "No news articles available yet."}
            </h3>
            <p>
              {lang === "mr"
                ? "नवीन बातमी जोडण्यासाठी खालील बातमी सबमिट करा बटण वापरा."
                : "Upload a new article using the button below."}
            </p>
          </div>
        ) : (
          <ul className={isMobile ? "mobile-article-list" : "article-grid"}>
            {visibleStories.map((story) =>
              isMobile ? (
                <MobileArticleCard
                  key={story.id}
                  image={story.image}
                  category={getCategoryLabel(story.categorySlug, lang)}
                  title={story.title}
                  excerpt={story.excerpt}
                  to={story.to}
                  publishedAt={story.publishedAt}
                />
              ) : (
                <ArticleCard
                  key={story.id}
                  image={story.image}
                  category={getCategoryLabel(story.categorySlug, lang)}
                  title={story.title}
                  excerpt={story.excerpt}
                  to={story.to}
                  publishedAt={story.publishedAt}
                />
              )
            )}
          </ul>
        )}

        {/* Load More & Upload News CTA Bar */}
        <div className="news-grid-actions">
          {hasMoreStories && (
            <button
              type="button"
              className="load-more-btn"
              onClick={handleLoadMore}
            >
              {lang === "mr" ? "अधिक बातम्या पाहा ↓" : "Load More Stories ↓"}
            </button>
          )}

          {session && (
            <button
              type="button"
              className="upload-news-btn"
              onClick={handleUploadClick}
            >
              {lang === "mr" ? "+ नवीन बातमी अपलोड करा" : "+ Upload News Article"}
            </button>
          )}
        </div>
      </div>

      {/* Upload News Modal */}
      {isModalOpen && (
        <UploadNewsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchTopCategoryStories();
          }}
        />
      )}
    </section>
  );
}
