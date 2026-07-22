import MobileNavbar from "../../components/MobileNavbar";
import BreakingTicker from "../../components/BreakingTicker";
import MobileCategoryScroll from "../../components/MobileCategoryScroll";
import MobileHero from "../../components/MobileHero";
import MobileNewsGrid from "../../components/MobileNewsGrid";
import MobileFooter from "../../components/MobileFooter";

export default function MobileLayout() {
  return (
    <div className="mobile-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Mobile Navbar (~60px height, logo 110-140px, hamburger drawer) */}
      <MobileNavbar />

      {/* Breaking News Ticker (38-42px height, 14-15px font) */}
      <div className="mobile-ticker-wrapper">
        <BreakingTicker />
      </div>

      {/* Scrollable Category Pills */}
      <MobileCategoryScroll />

      {/* Main Content Area */}
      <main id="main-content" className="mobile-main">
        {/* Stacked 1-Column Hero Section */}
        <MobileHero />

        {/* 1-Column News Grid */}
        <MobileNewsGrid />
      </main>

      {/* Centered Vertically Stacked Mobile Footer */}
      <MobileFooter />
    </div>
  );
}
