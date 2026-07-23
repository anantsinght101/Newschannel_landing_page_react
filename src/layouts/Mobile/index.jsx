import MobileNavbar from "../../components/MobileNavbar";
import BreakingTicker from "../../components/BreakingTicker";
import MobileCategoryScroll from "../../components/MobileCategoryScroll";
import MobileHero from "../../components/MobileHero";
import MobileNewsGrid from "../../components/MobileNewsGrid";
import MobileFooter from "../../components/MobileFooter";

export default function MobileLayout({ children }) {
  return (
    <div className="mobile-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Breaking News Ticker */}
      <div className="mobile-ticker-wrapper">
        <BreakingTicker />
      </div>

      {/* Scrollable Category Pills */}
      <MobileCategoryScroll />

      {/* Main Content Area */}
      <main id="main-content" className="mobile-main">
        {children ? (
          children
        ) : (
          <>
            <MobileHero />
            <MobileNewsGrid />
          </>
        )}
      </main>

      {/* Centered Mobile Footer */}
      <MobileFooter />
    </div>
  );
}
