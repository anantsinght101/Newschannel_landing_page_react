import { useState, useEffect } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import iconHamburger from "../assets/icon-hamburger.svg";
import logo from "../assets/logo.jpg";
import { navLinks, utilityLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { getCategoryLabel } from "../utils/categoryUtils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
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
        {/* Sidebar Hamburger Button */}
        <button
          type="button"
          className="navbar__hamburger"
          aria-expanded={isOpen}
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={iconHamburger} alt="" aria-hidden="true" width="20" height="20" />
          <span className="navbar__hamburger-text">{t("menu")}</span>
        </button>

        {/* Home Button on non-homepage views */}
        {!isHomePage && (
          <Link
            to="/"
            className="navbar__home-btn"
            title={t("returnHome")}
            onClick={handleLinkClick}
          >
            🏠 {t("home")}
          </Link>
        )}

        {/* Primary Navigation Bar */}
        <nav aria-label={t("mainSections")} className="navbar__nav">
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

        {/* Right Actions: LIVE Badge */}
        <div className="navbar__actions">
          <div className="navbar__live-badge" title={t("liveBadge")}>
            <span className="navbar__live-dot" />
            <span className="navbar__live-text">{t("liveBadge")}</span>
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
          <aside className="desktop-sidebar-drawer" aria-label={t("menu")}>
            <div className="desktop-sidebar-header">
              <div className="desktop-sidebar-brand">
                <img src={logo} alt="News Yatra Logo" className="desktop-sidebar-logo" />
                <span className="desktop-sidebar-title">{t("siteName")}</span>
              </div>
              <button
                type="button"
                className="desktop-sidebar-close"
                onClick={() => setIsOpen(false)}
                aria-label={t("closeMenu")}
              >
                &times;
              </button>
            </div>

            <div className="desktop-sidebar-body">
              {/* Language Switcher inside sidebar */}
              <div className="desktop-sidebar-lang">
                <span className="sidebar-lang-label">{t("selectLanguage")}:</span>
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

              {/* Main Sections Navigation */}
              <div className="desktop-sidebar-section">
                <h4 className="sidebar-section-heading">{t("mainSections")}</h4>
                <ul className="desktop-sidebar-nav">
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `sidebar-nav-link sidebar-nav-link--featured${isActive ? " active" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      📂 {t("allCategories")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `sidebar-nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      🏠 {t("homepage")}
                    </NavLink>
                  </li>

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

              {/* Quick Utility Links */}
              <div className="desktop-sidebar-section">
                <h4 className="sidebar-section-heading">{t("quickLinks")}</h4>
                <ul className="desktop-sidebar-utility">
                  {utilityLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} onClick={handleLinkClick}>
                        {link.label[lang] || link.label.mr}
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
