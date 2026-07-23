import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import UploadNewsModal from "./UploadNewsModal";
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
  const { lang, t } = useLanguage();
  const isMobile = useMobileDetector(768);
  const { session } = useAuth();
  const navigate = useNavigate();

  const [categoryStories, setCategoryStories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Upload modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch articles once on initial mount
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

      // Collect published articles
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

      // Append remaining published articles from DB
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

  // Filter stories based on search query (Headline, Excerpt, Category Slug, Marathi/English Category Name)
  const filteredStories = categoryStories.filter((story) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();

    const titleMatch = story.title?.toLowerCase().includes(q);
    const excerptMatch = story.excerpt?.toLowerCase().includes(q);
    const categorySlugMatch = story.categorySlug?.toLowerCase().includes(q);
    const categoryMrMatch = getCategoryLabel(story.categorySlug, "mr").toLowerCase().includes(q);
    const categoryEnMatch = getCategoryLabel(story.categorySlug, "en").toLowerCase().includes(q);

    return titleMatch || excerptMatch || categorySlugMatch || categoryMrMatch || categoryEnMatch;
  });

  const visibleStories = filteredStories.slice(0, visibleCount);
  const hasMoreStories = visibleCount < filteredStories.length;

  return (
    <section
      className={isMobile ? "mobile-news-grid-section" : "news-grid-section"}
      aria-labelledby="news-grid-title"
    >
      <div className={isMobile ? "mobile-container" : "container"}>
        {/* Header Box with Section Title & Search Input */}
        <div className="news-grid-section__header-box">
          <div className="news-grid-section__title-group">
            <span className="grid-header-accent-dot" />
            <h2
              className={isMobile ? "mobile-news-grid-section__title" : "news-grid-section__title"}
              id="news-grid-title"
            >
              {t("topStories")}
            </h2>
          </div>

          {/* Interactive Search Bar */}
          <div className="news-grid-search-box">
            <span className="search-box-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="news-grid-search-input"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              aria-label={t("searchPlaceholder")}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-box-clear-btn"
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(6);
                }}
                title={t("clearSearch")}
                aria-label={t("clearSearch")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Match Status Notification */}
        {searchQuery.trim() && (
          <div className="search-filter-badge-bar">
            <span>
              {lang === "mr"
                ? `"${searchQuery}" शोध परिणामांनुसार: ${filteredStories.length} बातम्या सापडल्या`
                : `Search results for "${searchQuery}": ${filteredStories.length} articles found`}
            </span>
            <button
              type="button"
              className="search-filter-clear-link"
              onClick={() => setSearchQuery("")}
            >
              {t("clearSearch")}
            </button>
          </div>
        )}

        {loading ? (
          <div className="news-grid-loading">
            <div className="spinner-loader" />
            <p>{t("loadingStories")}</p>
          </div>
        ) : categoryStories.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon">📰</div>
            <h3>{t("noStoriesAvailable")}</h3>
            <p>{t("uploadHintText")}</p>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>{t("noSearchResultsTitle")}</h3>
            <p>
              {lang === "mr"
                ? `"${searchQuery}" साठी कोणतीही बातमी किंवा विभाग सापडला नाही. ${t("noSearchResultsDesc")}`
                : `No articles matching "${searchQuery}". ${t("noSearchResultsDesc")}`}
            </p>
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setSearchQuery("")}
            >
              {t("clearSearch")}
            </button>
          </div>
        ) : (
          <ul className="article-grid">
            {visibleStories.map((story) => (
              <ArticleCard
                key={story.id}
                image={story.image}
                category={getCategoryLabel(story.categorySlug, lang)}
                title={story.title}
                excerpt={story.excerpt}
                to={story.to}
                publishedAt={story.publishedAt}
              />
            ))}
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
              {t("loadMoreStories")}
            </button>
          )}

          {session && (
            <button
              type="button"
              className="upload-news-btn"
              onClick={handleUploadClick}
            >
              {t("uploadNewsBtn")}
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
