import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function BreakingTicker() {
  const { lang } = useLanguage();
  const [tickerHeadlines, setTickerHeadlines] = useState([]);

  useEffect(() => {
    fetchLatestHeadlines();
  }, [lang]);

  const fetchLatestHeadlines = async () => {
    try {
      // Fetch latest 10 published news articles from Supabase database
      const { data: dbArticles } = await supabase
        .from("articles")
        .select("id, headline, created_at, published_at")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      const items = [];
      if (dbArticles && dbArticles.length > 0) {
        dbArticles.forEach((art) => {
          items.push({
            id: art.id,
            title: art.headline,
            to: `/article/${art.id}`,
          });
        });
      } else {
        items.push({
          id: "channel-default",
          title:
            lang === "mr"
              ? "न्यूज यात्रा डिजिटल टीम — ताज्या व निष्पक्ष बातम्यांसाठी पाहत राहा न्यूज यात्रा."
              : "News Yatra — Stay tuned for live independent news coverage.",
          to: "/",
        });
      }

      setTickerHeadlines(items);
    } catch (err) {
      console.error("Error fetching breaking news ticker headlines:", err);
      setTickerHeadlines([
        {
          id: "channel-fallback",
          title:
            lang === "mr"
              ? "न्यूज यात्रा डिजिटल टीम — ताज्या बातम्या."
              : "News Yatra — Live Coverage.",
          to: "/",
        },
      ]);
    }
  };

  // Duplicate items array to create seamless infinite CSS marquee scrolling loop
  const displayItems = [...tickerHeadlines, ...tickerHeadlines];

  return (
    <div className="ticker" role="region" aria-label="Breaking news scroller">
      <div className="ticker__label">
        <span className="ticker__flash-dot" />
        <span>{sectionTitles.tickerLabel[lang]}</span>
      </div>
      <div className="ticker__track">
        <div className="ticker__content">
          {displayItems.map((item, index) => (
            <span className="ticker__item" key={`${item.id}-${index}`}>
              <span className="ticker__bullet">•</span>{" "}
              <Link to={item.to} className="ticker__headline-link">
                {item.title}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
