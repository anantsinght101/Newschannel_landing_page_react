import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { useMobileDetector } from "../hooks/useMobileDetector";
import { formatFullDate, formatTimeAgo } from "../utils/dateUtils";
import { extractYouTubeId } from "../utils/youtubeUtils";
import { getCategoryLabel } from "../utils/categoryUtils";
import ArticleCard from "../components/ArticleCard";

// Import sample thumbnails as fallbacks for missing media images
import thumb1 from "../assets/article-thumbnail-1.svg";
import thumb2 from "../assets/article-thumbnail-2.svg";
import thumb3 from "../assets/article-thumbnail-3.svg";
import thumb4 from "../assets/article-thumbnail-4.svg";
import thumb5 from "../assets/article-thumbnail-5.svg";
import thumb6 from "../assets/article-thumbnail-6.svg";

const fallbackThumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

export default function ArticleDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const isMobile = useMobileDetector(768);

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Lightbox State
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchArticleData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, lang]);

  const fetchArticleData = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      let foundArticle = null;

      // Query Supabase DB for matching article ID
      if (id) {
        const { data: dbArt } = await supabase
          .from("articles")
          .select("*, categories(id, name, slug)")
          .eq("id", id)
          .maybeSingle();

        if (dbArt) {
          const catSlug = dbArt.categories?.slug || "special";
          foundArticle = {
            id: dbArt.id,
            headline: dbArt.headline,
            content: dbArt.content,
            mediaUrls: dbArt.media_urls || [],
            youtubeUrl: dbArt.youtube_url || null,
            author: dbArt.author || (lang === "mr" ? "न्यूज यात्रा डिजिटल टीम" : "News Yatra Team"),
            publishedAt: dbArt.published_at || dbArt.created_at,
            categoryName: getCategoryLabel(catSlug || dbArt.categories?.name, lang),
            categorySlug: catSlug,
          };
        }
      }

      if (!foundArticle) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(foundArticle);

      // Fetch Related Published Articles
      const { data: relatedDb } = await supabase
        .from("articles")
        .select("id, headline, content, media_urls, created_at, published_at, categories(name)")
        .eq("status", "published")
        .neq("id", foundArticle.id)
        .limit(3);

      const relatedList = [];
      if (relatedDb && relatedDb.length > 0) {
        relatedDb.forEach((r, idx) => {
          relatedList.push({
            id: r.id,
            title: r.headline,
            excerpt: r.content ? r.content.substring(0, 120) + "..." : "",
            categoryName: getCategoryLabel(r.categories?.slug || r.categories?.name, lang),
            image: r.media_urls && r.media_urls.length > 0 ? r.media_urls[0] : fallbackThumbnails[idx % 6],
            publishedAt: r.published_at || r.created_at,
            to: `/article/${r.id}`,
          });
        });
      }

      setRelatedArticles(relatedList);
    } catch (err) {
      console.error("Error fetching article detail:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <main id="main-content" className="article-detail-page">
        <div className="container">
          <div className="article-detail-loading">
            <div className="spinner-loader" />
            <p>{lang === "mr" ? "बातमी लोड होत आहे..." : "Loading article..."}</p>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <main id="main-content" className="article-detail-page">
        <div className="container">
          <div className="article-not-found">
            <h2>{lang === "mr" ? "बातमी सापडली नाही" : "Article Not Found"}</h2>
            <p>
              {lang === "mr"
                ? "तुम्ही शोधत असलेली बातमी उपलब्ध नाही किंवा हटवली गेली आहे."
                : "The requested article is not available or has been removed."}
            </p>
            <Link to="/" className="empty-back-btn">
              {lang === "mr" ? "← मुख्यपृष्ठावर जा" : "← Return to Homepage"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const youtubeId = extractYouTubeId(article.youtubeUrl);
  const mediaCount = article.mediaUrls.length;

  return (
    <main id="main-content" className="article-detail-page">
      <div className="container article-detail-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            {lang === "mr" ? "मुख्यपृष्ठ" : "Home"}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/${article.categorySlug}`} className="breadcrumb-link">
            {article.categoryName}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{article.headline}</span>
        </nav>

        {/* 1. Article Header */}
        <header className="article-header">
          <div className="article-header-meta">
            <Link to={`/${article.categorySlug}`} className="article-category-badge">
              {article.categoryName}
            </Link>
            <span className="article-time-ago">
              • {formatTimeAgo(article.publishedAt, lang)}
            </span>
          </div>

          <h1 className="article-headline">{article.headline}</h1>

          <div className="article-author-byline">
            <div className="author-avatar">
              <span>NY</span>
            </div>
            <div className="author-info">
              <span className="author-name">{article.author}</span>
              <span className="publish-datetime">
                {formatFullDate(article.publishedAt, lang)}
              </span>
            </div>

            {/* Social Share Bar */}
            <div className="article-share-bar">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  article.headline + " " + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-btn--whatsapp"
                title="WhatsApp वर शेअर करा"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-btn--facebook"
                title="Facebook वर शेअर करा"
              >
                <span>Facebook</span>
              </a>
              <button
                type="button"
                className="share-btn share-btn--copy"
                onClick={handleCopyLink}
                title="लिंक कॉपी करा"
              >
                {copiedLink
                  ? lang === "mr"
                    ? "कॉपी झाले!"
                    : "Copied!"
                  : lang === "mr"
                  ? "लिंक कॉपी"
                  : "Copy Link"}
              </button>
            </div>
          </div>
        </header>

        {/* 2. Media Gallery Section */}
        {mediaCount > 0 && (
          <section className="article-media-gallery" aria-label="Media Gallery">
            {mediaCount === 1 ? (
              /* Single Featured Image */
              <div
                className="single-featured-image-wrapper"
                onClick={() => setActiveImageIndex(0)}
              >
                <img
                  src={article.mediaUrls[0]}
                  alt={article.headline}
                  className="single-featured-image"
                />
                <span className="lightbox-zoom-hint">🔍 {lang === "mr" ? "झूम करा" : "Click to view"}</span>
              </div>
            ) : (
              /* Multiple Images Gallery Grid (Max 6) */
              <div className={`gallery-grid gallery-grid--${Math.min(mediaCount, 6)}`}>
                {article.mediaUrls.slice(0, 6).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="gallery-grid-item"
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img
                      src={imgUrl}
                      alt={`Article Media ${idx + 1}`}
                      className="gallery-grid-img"
                    />
                    <span className="lightbox-zoom-hint">🔍</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. Embedded YouTube Video (Renders only if youtubeUrl is provided) */}
        {youtubeId && (
          <section className="article-youtube-section" aria-label="YouTube Video">
            <h3 className="section-subtitle">
              🎥 {lang === "mr" ? "विशेष व्हिडिओ बातमी" : "Featured Video Coverage"}
            </h3>
            <div className="youtube-player-container">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                title={article.headline}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-iframe"
              />
            </div>
          </section>
        )}

        {/* 4. Article Content Section */}
        <section className="article-content-body">
          {article.content.split("\n").map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            return (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            );
          })}
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="related-articles-section">
            <h3 className="related-title">
              {lang === "mr" ? "संबंधित बातम्या" : "Related Stories"}
            </h3>
            <ul className="article-grid">
              {relatedArticles.map((relArt) => (
                <ArticleCard
                  key={relArt.id}
                  image={relArt.image}
                  category={relArt.categoryName}
                  title={relArt.title}
                  excerpt={relArt.excerpt}
                  to={relArt.to}
                  publishedAt={relArt.publishedAt}
                />
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Lightbox Modal for Image Viewing */}
      {activeImageIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setActiveImageIndex(null)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close image lightbox"
            >
              &times;
            </button>

            <img
              src={article.mediaUrls[activeImageIndex]}
              alt={`Full size view ${activeImageIndex + 1}`}
              className="lightbox-full-img"
            />

            <div className="lightbox-footer">
              <span>
                {activeImageIndex + 1} / {mediaCount}
              </span>
              {mediaCount > 1 && (
                <div className="lightbox-nav-btns">
                  <button
                    type="button"
                    disabled={activeImageIndex === 0}
                    onClick={() => setActiveImageIndex((prev) => prev - 1)}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={activeImageIndex === mediaCount - 1}
                    onClick={() => setActiveImageIndex((prev) => prev + 1)}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
