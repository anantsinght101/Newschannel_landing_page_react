import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
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

export default function CategoriesOverview() {
  const { lang } = useLanguage();
  const isMobile = useMobileDetector(768);

  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesWithLatest();
  }, [lang]);

  const fetchCategoriesWithLatest = async () => {
    setLoading(true);
    try {
      // 1. Fetch categories
      const { data: dbCategories } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", { ascending: true });

      // 2. Fetch published articles
      const { data: dbArticles } = await supabase
        .from("articles")
        .select("id, headline, content, media_urls, created_at, published_at, category_id, categories(id, name, slug)")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      const categoryCards = [];

      if (dbCategories && dbCategories.length > 0) {
        dbCategories.forEach((cat, idx) => {
          // Find latest published article for this category
          const latestArt = dbArticles
            ? dbArticles.find((art) => art.category_id === cat.id)
            : null;

          if (latestArt) {
            categoryCards.push({
              id: cat.id,
              slug: cat.slug,
              categoryName: getCategoryLabel(cat.slug, lang),
              articleId: latestArt.id,
              title: latestArt.headline,
              excerpt: latestArt.content ? latestArt.content.substring(0, 140) + "..." : "",
              image:
                latestArt.media_urls && latestArt.media_urls.length > 0
                  ? latestArt.media_urls[0]
                  : fallbackThumbnails[idx % fallbackThumbnails.length],
              publishedAt: latestArt.published_at || latestArt.created_at,
              to: `/${cat.slug}`,
            });
          }
        });
      }

      setCategoriesList(categoryCards);
    } catch (err) {
      console.error("Error loading categories overview:", err);
      setCategoriesList([]);
    } finally {
      setLoading(false);
    }
  };

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
            <span className="breadcrumb-current">
              {lang === "mr" ? "सर्व विभाग" : "All Categories"}
            </span>
          </nav>

          <div className="category-title-row">
            <h1 className="category-title">
              {lang === "mr" ? "सर्व बातम्यांचे विभाग" : "All News Categories"}
            </h1>
            <span className="category-count-badge">
              {categoriesList.length}{" "}
              {lang === "mr" ? "विभाग उपलब्ध" : "Categories Available"}
            </span>
          </div>
        </div>

        {/* Categories Grid (Same layout as homepage news grid) */}
        {loading ? (
          <div className="category-loading">
            <div className="spinner-loader" />
            <p>{lang === "mr" ? "विभाग लोड होत आहेत..." : "Loading categories..."}</p>
          </div>
        ) : categoriesList.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon">📰</div>
            <h3>
              {lang === "mr" ? "कोणताही विभाग सापडला नाही." : "No categories found."}
            </h3>
            <Link to="/" className="empty-back-btn">
              {lang === "mr" ? "← मुख्यपृष्ठावर जा" : "← Return to Homepage"}
            </Link>
          </div>
        ) : (
          <ul className="article-grid">
            {categoriesList.map((catItem) => (
              <ArticleCard
                key={catItem.id}
                image={catItem.image}
                category={catItem.categoryName}
                title={catItem.title}
                excerpt={catItem.excerpt}
                to={catItem.to}
                publishedAt={catItem.publishedAt}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
