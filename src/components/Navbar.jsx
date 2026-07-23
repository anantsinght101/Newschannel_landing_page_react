import { useState, useEffect } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import iconHamburger from "../assets/icon-hamburger.svg";
import logo from "../assets/logo.jpg";
import { navLinks, utilityLinks, sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { getCategoryLabel } from "../utils/categoryUtils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Prevent background scrolling when sidebar drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Sidebar Hamburger Button - Always Clickable at 90%, 100%, 200% Zoom */}
        <button
          type="button"
          className="navbar__hamburger"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close sidebar menu" : "Open sidebar menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={iconHamburger} alt="" aria-hidden="true" width="20" height="20" />
          <span className="navbar__hamburger-text">
            {lang === "mr" ? "मेनू" : "Menu"}
          </span>
        </button>

        {/* Task 1: Home Button on every page other than Homepage */}
        {!isHomePage && (
          <Link
            to="/"
            className="navbar__home-btn"
            title={lang === "mr" ? "मुख्यपृष्ठावर जा" : "Go to Homepage"}
            onClick={handleLinkClick}
          >
            🏠 {lang === "mr" ? "होम" : "Home"}
          </Link>
        )}

        {/* Primary Horizontal Navigation Bar */}
        <nav aria-label="Primary navigation" className="navbar__nav">
          <ul id="primary-navigation" className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__link${lang === "mr" ? " navbar__link--mr" : ""}${
                      isActive ? " navbar__link--active" : ""
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  {getCategoryLabel(link.to.replace("/", ""), lang)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions: LIVE Badge (Task 3: Search button removed) */}
        <div className="navbar__actions">
          <div className="navbar__live-badge" title="Live Broadcast Stream Available">
            <span className="navbar__live-dot" />
            <span className="navbar__live-text">{sectionTitles.liveBadge[lang]}</span>
          </div>
        </div>
      </div>

      {/* Slide-out White Sidebar Drawer */}
      {isOpen && (
        <>
          <div
            className="desktop-sidebar-overlay"
            onClick={() => setIsOpen(false)}
          />
          <aside className="desktop-sidebar-drawer" aria-label="Sidebar Menu">
            <div className="desktop-sidebar-header">
              <div className="desktop-sidebar-brand">
                <img src={logo} alt="News Yatra Logo" className="desktop-sidebar-logo" />
                <span className="desktop-sidebar-title">
                  {lang === "mr" ? "न्यूज यात्रा" : "NEWS YATRA"}
                </span>
              </div>
              <button
                type="button"
                className="desktop-sidebar-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar"
              >
                &times;
              </button>
            </div>

            <div className="desktop-sidebar-body">
              {/* Language Switcher inside sidebar */}
              <div className="desktop-sidebar-lang">
                <span className="sidebar-lang-label">
                  {lang === "mr" ? "भाषा निवडा (Language):" : "Language:"}
                </span>
                <div className="sidebar-lang-buttons">
                  <button
                    type="button"
                    className={`sidebar-lang-btn${lang === "mr" ? " active" : ""}`}
                    onClick={() => setLang("mr")}
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    className={`sidebar-lang-btn${lang === "en" ? " active" : ""}`}
                    onClick={() => setLang("en")}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Task 6 & 5: All Categories Navigation (First option: Categories page) */}
              <div className="desktop-sidebar-section">
                <h4 className="sidebar-section-heading">
                  {lang === "mr" ? "मुख्य विभाग" : "Main Sections"}
                </h4>
                <ul className="desktop-sidebar-nav">
                  {/* Task 6: Categories page option is the FIRST option in sidebar */}
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `sidebar-nav-link sidebar-nav-link--featured${isActive ? " active" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      📂 {lang === "mr" ? "सर्व विभाग" : "All Categories"}
                    </NavLink>
                  </li>

                  {/* Home option in sidebar */}
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `sidebar-nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      🏠 {lang === "mr" ? "मुख्यपृष्ठ (Home)" : "Homepage"}
                    </NavLink>
                  </li>

                  {/* All 12 News Category Pages */}
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `sidebar-nav-link${isActive ? " active" : ""}`
                        }
                        onClick={handleLinkClick}
                      >
                        {getCategoryLabel(link.to.replace("/", ""), lang)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Utility Links (Admin Login, e-Paper, Contact) */}
              <div className="desktop-sidebar-section">
                <h4 className="sidebar-section-heading">
                  {lang === "mr" ? "उपयुक्त लिंक्स" : "Quick Links"}
                </h4>
                <ul className="desktop-sidebar-utility">
                  {utilityLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} onClick={handleLinkClick}>
                        {link.label[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
