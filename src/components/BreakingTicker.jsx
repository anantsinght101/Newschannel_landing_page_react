import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabaseClient";

export default function BreakingTicker() {
  const { lang, t } = useLanguage();
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetchLatestHeadlines();
  }, []);

  const fetchLatestHeadlines = async () => {
    try {
      // Query published articles ordered by created_at descending
      const { data, error } = await supabase
        .from("articles")
        .select("id, headline, created_at, published_at")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        const headlineItems = data.map((item) => ({
          id: item.id,
          text: item.headline,
          to: `/article/${item.id}`,
        }));
        setHeadlines(headlineItems);
      } else {
        setHeadlines([]);
      }
    } catch (err) {
      console.error("Error fetching breaking headlines:", err);
      setHeadlines([]);
    }
  };

  if (headlines.length === 0) {
    return null;
  }

  return (
    <div className="ticker" aria-label={t("breakingNews")}>
      <div className="ticker__label">
        <span className="ticker__flash-dot" />
        <span>{t("breakingNews")}</span>
      </div>

      <div className="ticker__track">
        <div className="ticker__content">
          {headlines.map((item, idx) => (
            <span key={`${item.id}-${idx}`} className="ticker__item">
              <Link to={item.to} className="ticker__headline-link">
                {item.text}
              </Link>
            </span>
          ))}
          {/* Duplicate loop for seamless infinite marquee loop */}
          {headlines.map((item, idx) => (
            <span key={`dup-${item.id}-${idx}`} className="ticker__item" aria-hidden="true">
              <Link to={item.to} className="ticker__headline-link">
                {item.text}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
