import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import UploadNewsModal from "../components/UploadNewsModal";
import { supabase } from "../lib/supabaseClient";
import { getCategoryLabel } from "../utils/categoryUtils";

// Fallback thumbnail
import thumb1 from "../assets/article-thumbnail-1.svg";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { lang, t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);

  // Modal confirmation state for deletion
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const fetchPublishedArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, headline, content, media_urls, status, created_at, published_at, category_id, categories(id, name, slug)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles for admin dashboard:", error);
      } else {
        setArticles(data || []);
      }
    } catch (err) {
      console.error("Unexpected error fetching admin articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchPublishedArticles();
    setMessage({
      type: "success",
      text: lang === "mr" ? "नवीन बातमी यशस्वीरीत्या अपलोड केली!" : "New article uploaded successfully!",
    });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    setDeleteLoadingId(targetId);
    setMessage(null);

    try {
      // Backend Supabase Deletion
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", targetId);

      if (error) {
        console.error("Error deleting article:", error);
        setMessage({
          type: "error",
          text: `${t("deleteError")}${error.message}`,
        });
      } else {
        // Frontend State Update
        setArticles((prev) => prev.filter((item) => item.id !== targetId));
        setMessage({
          type: "success",
          text: t("articleDeletedSuccess"),
        });
      }
    } catch (err) {
      console.error("Deletion catch error:", err);
      setMessage({
        type: "error",
        text: `${t("deleteError")}${err.message || "Unknown error"}`,
      });
    } finally {
      setDeleteLoadingId(null);
      setDeleteTarget(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  // Filter articles by search query
  const filteredArticles = articles.filter((art) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const catName = art.categories?.name || getCategoryLabel(art.category_id, lang) || "";
    return (
      art.headline?.toLowerCase().includes(q) ||
      catName.toLowerCase().includes(q) ||
      String(art.id).includes(q)
    );
  });

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        {/* Header Bar */}
        <div className="admin-dashboard-header">
          <div>
            <h1 className="admin-dashboard-title">{t("adminDashboardTitle")}</h1>
            <p className="admin-dashboard-subtitle">
              {t("loggedInUser")} <strong>{user?.email}</strong>
            </p>
          </div>
          <div className="admin-dashboard-actions">
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={() => setIsModalOpen(true)}
            >
              + {t("uploadNewsBtn")}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={signOut}
            >
              {t("logOutBtn")}
            </button>
          </div>
        </div>

        {/* Global Toast Message */}
        {message && (
          <div className={`admin-toast admin-toast--${message.type}`}>
            {message.type === "success" ? "✅ " : "⚠️ "}
            {message.text}
          </div>
        )}

        {/* System Overview Card */}
        <div className="admin-dashboard-content">
          <div className="admin-card">
            <h2>{t("systemStatusTitle")}</h2>
            <p>{t("systemStatusDesc")}</p>
          </div>

          {/* Published Articles Section */}
          <div className="admin-card admin-articles-section">
            <div className="admin-articles-header">
              <div className="admin-articles-title-box">
                <h2>
                  📰 {t("publishedArticlesTitle")}{" "}
                  <span className="admin-articles-count">({filteredArticles.length})</span>
                </h2>
                <span className="admin-articles-sort-hint">
                  ⚡ {lang === "mr" ? "नवीनतम प्रथम दर्शवले आहे" : "Ordered by latest published first"}
                </span>
              </div>

              {/* Search & Refresh Bar */}
              <div className="admin-articles-controls">
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder={t("searchArticlesPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={fetchPublishedArticles}
                  title={lang === "mr" ? "रिफ्रेश करा" : "Refresh List"}
                >
                  🔄 {lang === "mr" ? "रिफ्रेश" : "Refresh"}
                </button>
              </div>
            </div>

            {/* Articles Table / List */}
            {loading ? (
              <div className="admin-articles-loading">
                <div className="admin-spinner" />
                <p>{lang === "mr" ? "बातमी डेटा लोड होत आहे..." : "Loading published articles..."}</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="admin-articles-empty">
                <p>{t("noArticlesFound")}</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{lang === "mr" ? "फोटो" : "Media"}</th>
                      <th>{t("headline")}</th>
                      <th>{lang === "mr" ? "श्रेणी" : "Category"}</th>
                      <th>{lang === "mr" ? "प्रसिद्धी वेळ" : "Published At"}</th>
                      <th>{t("status")}</th>
                      <th className="text-right">{lang === "mr" ? "कारवाई" : "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((art, index) => {
                      const imageSrc =
                        art.media_urls && art.media_urls.length > 0
                          ? art.media_urls[0]
                          : thumb1;
                      const catName =
                        art.categories?.name ||
                        getCategoryLabel(art.category_id, lang) ||
                        (lang === "mr" ? "सामान्य" : "General");
                      const pubDate = new Date(
                        art.published_at || art.created_at
                      ).toLocaleString(lang === "mr" ? "mr-IN" : "en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      });

                      return (
                        <tr key={art.id}>
                          <td className="admin-col-num">{index + 1}</td>
                          <td className="admin-col-thumb">
                            <img
                              src={imageSrc}
                              alt=""
                              className="admin-thumb-img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = thumb1;
                              }}
                            />
                          </td>
                          <td className="admin-col-headline">
                            <div className="admin-headline-text" title={art.headline}>
                              {art.headline}
                            </div>
                            <span className="admin-article-id-code">ID: {art.id}</span>
                          </td>
                          <td className="admin-col-category">
                            <span className="admin-category-badge">{catName}</span>
                          </td>
                          <td className="admin-col-date">{pubDate}</td>
                          <td className="admin-col-status">
                            <span className="status-badge status-badge--published">
                              {lang === "mr" ? "प्रसिद्ध" : "Published"}
                            </span>
                          </td>
                          <td className="admin-col-actions text-right">
                            <Link
                              to={`/article/${art.id}`}
                              target="_blank"
                              className="admin-action-btn admin-action-btn--view"
                              title={t("viewArticleBtn")}
                            >
                              👁️ {t("viewArticleBtn")}
                            </Link>
                            <button
                              type="button"
                              className="admin-action-btn admin-action-btn--delete"
                              onClick={() => setDeleteTarget(art)}
                              disabled={deleteLoadingId === art.id}
                              title={t("deleteArticleBtn")}
                            >
                              {deleteLoadingId === art.id ? "⏳..." : `🗑️ ${t("deleteArticleBtn")}`}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="admin-delete-modal-overlay">
          <div className="admin-delete-modal">
            <h3 className="admin-delete-modal-title">
              ⚠️ {lang === "mr" ? "बातमी हटवण्याची खात्री करा" : "Confirm Delete Article"}
            </h3>
            <p className="admin-delete-modal-headline">
              "{deleteTarget.headline}"
            </p>
            <p className="admin-delete-modal-warning">{t("confirmDeleteText")}</p>
            <div className="admin-delete-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn--secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoadingId !== null}
              >
                {lang === "mr" ? "रद्द करा" : "Cancel"}
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleDeleteConfirm}
                disabled={deleteLoadingId !== null}
              >
                {deleteLoadingId ? "हटवत आहे..." : `🗑️ ${t("deleteArticleBtn")}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <UploadNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
