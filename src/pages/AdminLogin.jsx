import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.jpg";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const { t } = useLanguage();

  const from = location.state?.from?.pathname || "/admin";

  // If user is already logged in, redirect to admin dashboard
  if (session) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg(t("loginRequiredError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(t("loginFailedError"));
      } else if (data?.user) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMsg(t("unexpectedError"));
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src={logo} alt="News Yatra Logo" className="admin-login-logo" />
          <h1 className="admin-login-title">{t("adminPortalTitle")}</h1>
          <p className="admin-login-subtitle">{t("adminPortalSubtitle")}</p>
        </div>

        {errorMsg && <div className="admin-login-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email">{t("emailLabel")}</label>
            <input
              id="admin-email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">{t("passwordLabel")}</label>
            <input
              id="admin-password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="admin-login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("loggingIn") : t("loginBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}
