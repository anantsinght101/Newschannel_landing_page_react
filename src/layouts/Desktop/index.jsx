import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import BreakingTicker from "../../components/BreakingTicker";
import Footer from "../../components/Footer";

export default function DesktopLayout({ children }) {
  return (
    <div className="desktop-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopBar />
      <Navbar />
      <BreakingTicker />
      <div className="desktop-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
