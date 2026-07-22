import { breakingNews } from "../siteData";

/**
 * Red "Breaking News" ticker bar with a continuously scrolling headline row,
 * matching the reference site's ticker below the main navbar.
 */
export default function BreakingTicker() {
  // Duplicate the list so the CSS marquee loops seamlessly.
  const items = [...breakingNews, ...breakingNews];

  return (
    <div className="ticker" role="region" aria-label="Breaking news">
      <span className="ticker__label">Breaking News</span>
      <div className="ticker__track">
        <div className="ticker__content">
          {items.map((item, index) => (
            <span className="ticker__item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
