import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconHamburger from "../assets/icon-hamburger.svg";
import iconSearch from "../assets/icon-search.svg";
import { navLinks, utilityLinks, sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  return (
    <header className="mobile-navbar">
      <div className="mobile-navbar__header-bar">
        {/* Left: Hamburger Button */}
        <button
          type="button"
          className="mobile-navbar__hamburger"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={iconHamburger} alt="" width="22" height="22" />
        </button>

        {/* Center: Brand Logo (110-140px) */}
        <Link to="/" className="mobile-navbar__logo-link" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="News Yatra Logo" className="mobile-navbar__logo-img" />
          <span className="mobile-navbar__brand-name">
            {lang === "mr" ? "न्यूज यात्रा" : "NEWS YATRA"}
          </span>
        </Link>

        {/* Right: Actions (Search + Live Badge) */}
        <div className="mobile-navbar__right">
          <div className="mobile-navbar__live-badge">
            <span className="mobile-navbar__live-dot" />
            <span>{sectionTitles.liveBadge[lang]}</span>
          </div>

          <button
            type="button"
            className="mobile-navbar__icon-btn"
            aria-label="Toggle Search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <img src={iconSearch} alt="" width="18" height="18" />
          </button>
        </div>
      </div>

      {/* Search Drawer */}
      {isSearchOpen && (
        <div className="mobile-navbar__search-drawer">
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder={
                lang === "mr" ? "बातम्या शोधा..." : "Search news..."
              }
              className="mobile-navbar__search-input"
            />
            <button type="submit" className="mobile-navbar__search-btn">
              {lang === "mr" ? "शोधा" : "Search"}
            </button>
          </form>
        </div>
      )}

      {/* Hamburger Full Menu Drawer */}
      {isOpen && (
        <div className="mobile-navbar__menu-drawer">
          {/* Top: Language Switcher inside drawer */}
          <div className="mobile-navbar__lang-box">
            <span className="mobile-navbar__lang-label">
              {lang === "mr" ? "भाषा निवडा / Language:" : "Language:"}
            </span>
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

          {/* Nav Categories List */}
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-navbar__links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `mobile-navbar__link${isActive ? " active" : ""}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label[lang]}
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
                  <Link to={link.to} onClick={() => setIsOpen(false)}>
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
