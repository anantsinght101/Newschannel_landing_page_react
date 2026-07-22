import { breakingNews, sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function BreakingTicker() {
  const { lang } = useLanguage();
  const currentNews = breakingNews[lang] || breakingNews.mr;
  const items = [...currentNews, ...currentNews];

  return (
    <div className="ticker" role="region" aria-label="Breaking news scroller">
      <div className="ticker__label">
        <span className="ticker__flash-dot" />
        <span>{sectionTitles.tickerLabel[lang]}</span>
      </div>
      <div className="ticker__track">
        <div className="ticker__content">
          {items.map((item, index) => (
            <span className="ticker__item" key={`${item}-${index}`}>
              <span className="ticker__bullet">•</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
