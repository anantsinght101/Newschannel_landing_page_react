import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import UploadNewsModal from "../components/UploadNewsModal";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentUpload, setRecentUpload] = useState(null);

  const handleUploadSuccess = (newArticle) => {
    setRecentUpload(newArticle);
  };

  return (
    <div className="admin-dashboard-page">
      <div className="container">
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
              {t("uploadNewsBtn")}
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

        <div className="admin-dashboard-content">
          <div className="admin-card">
            <h2>{t("systemStatusTitle")}</h2>
            <p>{t("systemStatusDesc")}</p>
          </div>

          {recentUpload && (
            <div className="admin-card admin-card--success">
              <h3>{t("recentlySubmittedNews")}</h3>
              <p>
                <strong>{t("headline")}:</strong> {recentUpload.headline}
              </p>
              <p>
                <strong>{t("status")}:</strong>{" "}
                <span className="status-badge status-badge--pending">
                  {recentUpload.status}
                </span>
              </p>
              <p>
                <strong>{t("articleId")}:</strong> <code>{recentUpload.id}</code>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
