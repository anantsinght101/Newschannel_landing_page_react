import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UploadNewsModal from "../components/UploadNewsModal";

/**
 * AdminDashboard - Home base for admin actions
 *
 * NOTE: Since there is only ever one admin account, RLS policies treat
 * "any authenticated user" as "the admin" for now — an admins table or role
 * system is unnecessary for a single fixed account.
 */
export default function AdminDashboard() {
  const { user, signOut } = useAuth();
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
            <h1 className="admin-dashboard-title">अ‍ॅडमिन डॅशबोर्ड (Admin Dashboard)</h1>
            <p className="admin-dashboard-subtitle">
              लॉग इन वापरकर्ता: <strong>{user?.email}</strong>
            </p>
          </div>
          <div className="admin-dashboard-actions">
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={() => setIsModalOpen(true)}
            >
              + नवीन बातमी अपलोड करा
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={signOut}
            >
              लॉग आउट (Log Out)
            </button>
          </div>
        </div>

        <div className="admin-dashboard-content">
          <div className="admin-card">
            <h2>प्रणाली स्थिती (System Status)</h2>
            <p>
              अ‍ॅडमिन पोर्टलमध्ये आपले स्वागत आहे. येथून आपण नवीन बातमी अपलोड करू शकता व तिचा मसुदा (pending status) डेटाबेसमध्ये पाठवू शकता.
            </p>
          </div>

          {recentUpload && (
            <div className="admin-card admin-card--success">
              <h3>अलीकडे सबमिट केलेली बातमी (Recently Submitted News)</h3>
              <p>
                <strong>शीर्षक:</strong> {recentUpload.headline}
              </p>
              <p>
                <strong>स्थिती:</strong>{" "}
                <span className="status-badge status-badge--pending">
                  {recentUpload.status}
                </span>
              </p>
              <p>
                <strong>आयडी:</strong> <code>{recentUpload.id}</code>
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
