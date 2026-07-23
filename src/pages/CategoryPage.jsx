import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { navLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { useMobileDetector } from "../hooks/useMobileDetector";
import { supabase } from "../lib/supabaseClient";
import { getCategoryLabel } from "../utils/categoryUtils";

// Import sample thumbnails as fallbacks for missing images
import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";

const fallbackThumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

export default function CategoryPage({ routeCategorySlug }) {
  const params = useParams();
  const { lang } = useLanguage();
  const isMobile = useMobileDetector(768);

  const slug = routeCategorySlug || params.categorySlug || params["*"] || "latest";

  const [categoryInfo, setCategoryInfo] = useState(null);
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    fetchCategoryData();
  }, [slug, lang]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const cleanSlug = slug.replace("/", "");
      let categoryId = null;

      // 1. Query Supabase categories table
      const { data: catData } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", cleanSlug)
        .maybeSingle();

      if (catData) {
        categoryId = catData.id;
      }

      const displayTitle = getCategoryLabel(cleanSlug, lang);

      setCategoryInfo({
        slug: cleanSlug,
        title: displayTitle,
        categoryId,
      });

      const fetchedArticles = [];

      // 2. Query Supabase published articles for this category or all latest
      let articlesQuery = supabase
        .from("articles")
        .select("id, headline, content, media_urls, youtube_url, author, status, created_at, published_at, category_id, categories(id, name, slug)")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (cleanSlug !== "latest" && categoryId) {
        articlesQuery = articlesQuery.eq("category_id", categoryId);
      }

      const { data: dbArticles } = await articlesQuery;

      if (dbArticles && dbArticles.length > 0) {
        dbArticles.forEach((art, idx) => {
          fetchedArticles.push({
            id: art.id,
            title: art.headline,
            excerpt: art.content ? art.content.substring(0, 150) + "..." : "",
            categoryName: getCategoryLabel(art.categories?.slug || art.categories?.name || cleanSlug, lang),
            image:
              art.media_urls && art.media_urls.length > 0
                ? art.media_urls[0]
                : fallbackThumbnails[idx % fallbackThumbnails.length],
            publishedAt: art.published_at || art.created_at,
            to: `/article/${art.id}`,
          });
        });
      }

      setArticlesList(fetchedArticles);
    } catch (err) {
      console.error("Error fetching category data:", err);
      setArticlesList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleArticles = articlesList.slice(0, visibleCount);
  const hasMore = visibleCount < articlesList.length;

  return (
    <main id="main-content" className="category-page">
      <div className="container">
        {/* Category Header Banner */}
        <div className="category-header">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              {lang === "mr" ? "मुख्यपृष्ठ" : "Home"}
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{categoryInfo?.title || slug}</span>
          </nav>

          <div className="category-title-row">
            <h1 className="category-title">{categoryInfo?.title}</h1>
            <span className="category-count-badge">
              {articlesList.length}{" "}
              {lang === "mr" ? "बातम्या" : articlesList.length === 1 ? "Article" : "Articles"}
            </span>
          </div>
        </div>

        {/* Category Content Area */}
        {loading ? (
          <div className="category-loading">
            <div className="spinner-loader" />
            <p>{lang === "mr" ? "बातम्या लोड होत आहेत..." : "Loading category articles..."}</p>
          </div>
        ) : articlesList.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon">📰</div>
            <h3>
              {lang === "mr"
                ? "या विभागात अद्याप कोणतीही बातमी उपलब्ध नाही."
                : "No news articles available in this category yet."}
            </h3>
            <p>
              {lang === "mr"
                ? "कृपया थोड्या वेळाने पुन्हा तपासा किंवा मुख्यपृष्ठावर इतर ताज्या बातम्या पाहा."
                : "Please check back later or explore other top stories on the homepage."}
            </p>
            <Link to="/" className="empty-back-btn">
              {lang === "mr" ? "← मुख्यपृष्ठावर जा" : "← Go to Homepage"}
            </Link>
          </div>
        ) : (
          <>
            <ul className="article-grid">
              {visibleArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  image={article.image}
                  category={article.categoryName}
                  title={article.title}
                  excerpt={article.excerpt}
                  to={article.to}
                  publishedAt={article.publishedAt}
                />
              ))}
            </ul>

            {hasMore && (
              <div className="load-more-container">
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={handleLoadMore}
                >
                  {lang === "mr" ? "अजून बातम्या पाहा ↓" : "Load More Articles ↓"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
