import { useState, useEffect } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconHamburger from "../assets/icon-hamburger.svg";
import { navLinks, utilityLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";
import { getCategoryLabel } from "../utils/categoryUtils";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Prevent background scrolling when mobile menu drawer is open
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
    <header className="mobile-navbar">
      <div className="mobile-navbar__header-bar">
        {/* Left: Hamburger Button */}
        <button
          type="button"
          className="mobile-navbar__hamburger"
          aria-expanded={isOpen}
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={iconHamburger} alt="" width="22" height="22" />
        </button>

        {/* Home Button on non-homepage views */}
        {!isHomePage && (
          <Link
            to="/"
            className="mobile-navbar__home-btn"
            title={t("returnHome")}
            onClick={handleLinkClick}
          >
            🏠 {t("home")}
          </Link>
        )}

        {/* Center: Brand Logo */}
        <Link to="/" className="mobile-navbar__logo-link" onClick={handleLinkClick}>
          <img src={logo} alt="News Yatra Logo" className="mobile-navbar__logo-img" />
          <span className="mobile-navbar__brand-name">{t("siteName")}</span>
        </Link>

        {/* Right: Actions */}
        <div className="mobile-navbar__right">
          <div className="mobile-navbar__live-badge">
            <span className="mobile-navbar__live-dot" />
            <span>{t("liveBadge")}</span>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Overlay & Drawer */}
      {isOpen && (
        <>
          <div className="mobile-navbar__overlay" onClick={() => setIsOpen(false)} />
          <div className="mobile-navbar__menu-drawer">
            {/* Language Switcher inside drawer */}
            <div className="mobile-navbar__lang-box">
              <span className="mobile-navbar__lang-label">{t("selectLanguage")}:</span>
              <div className="mobile-navbar__lang-toggle">
                <button
                  type="button"
                  className={`mobile-navbar__lang-btn${lang === "mr" ? " active" : ""}`}
                  onClick={() => setLang("mr")}
                >
                  मराठी
                </button>
                <button
                  type="button"
                  className={`mobile-navbar__lang-btn${lang === "en" ? " active" : ""}`}
                  onClick={() => setLang("en")}
                >
                  English
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav aria-label={t("mainSections")}>
              <ul className="mobile-navbar__links">
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      `mobile-navbar__link mobile-navbar__link--featured${isActive ? " active" : ""}`
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
                      `mobile-navbar__link${isActive ? " active" : ""}`
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
                        `mobile-navbar__link${isActive ? " active" : ""}`
                      }
                      onClick={handleLinkClick}
                    >
                      {getCategoryLabel(link.to.replace("/", ""), lang)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Utility Links */}
            <div className="mobile-navbar__utility-section">
              <ul className="mobile-navbar__utility-links">
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
        </>
      )}
    </header>
  );
}
