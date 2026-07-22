import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();

  const from = location.state?.from?.pathname || "/admin";

  // If user is already logged in, redirect to admin dashboard
  if (session) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("कृपया ई-मेल आणि पासवर्ड दोन्ही भरा. (Please enter both email and password)");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(error.message || "लॉगिन अयशस्वी. कृपया तपशील तपासा.");
      } else if (data?.user) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMsg("काहीतरी चुकीचे घडले. कृपया पुन्हा प्रयत्न करा.");
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
          <h1 className="admin-login-title">अ‍ॅडमिन लॉगिन</h1>
          <p className="admin-login-subtitle">न्यूज यात्रा - व्यवस्थापन प्रणाली (Admin Portal)</p>
        </div>

        {errorMsg && <div className="admin-login-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email">ई-मेल आयडी (Email ID)</label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@newsyatra.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">पासवर्ड (Password)</label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••"
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
            {isSubmitting ? "लॉगिन करत आहे..." : "लॉगिन करा (Log In)"}
          </button>
        </form>
      </div>
    </div>
  );
}
