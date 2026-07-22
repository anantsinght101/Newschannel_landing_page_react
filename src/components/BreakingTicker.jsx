import { breakingNews } from "../siteData";

/**
 * Deep Red Breaking News Ticker component with near-black chip tag.
 */
export default function BreakingTicker() {
  const items = [...breakingNews, ...breakingNews];

  return (
    <div className="ticker" role="region" aria-label="Breaking news scroller">
      <div className="ticker__label">
        <span className="ticker__flash-dot" />
        <span>ताजी बातमी</span>
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
