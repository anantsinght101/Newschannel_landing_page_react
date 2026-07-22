import { useState } from "react";
import { NavLink } from "react-router-dom";
import iconHamburger from "../assets/icon-hamburger.svg";
import iconSearch from "../assets/icon-search.svg";
import { navLinks, sectionTitles } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { lang } = useLanguage();

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <button
          type="button"
          className="navbar__hamburger"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <img src={iconHamburger} alt="" aria-hidden="true" width="22" height="22" />
        </button>

        <nav
          aria-label="Primary navigation"
          className={`navbar__nav${isOpen ? " navbar__nav--open" : ""}`}
        >
          <ul
            id="primary-navigation"
            className={`navbar__links${isOpen ? " navbar__links--open" : ""}`}
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? " navbar__link--active" : ""}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label[lang]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <div className="navbar__live-badge" title="Live Broadcast Stream Available">
            <span className="navbar__live-dot" />
            <span className="navbar__live-text">{sectionTitles.liveBadge[lang]}</span>
          </div>

          <button
            type="button"
            className="navbar__icon-btn"
            aria-expanded={isSearchOpen}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            onClick={() => setIsSearchOpen((open) => !open)}
          >
            <img src={iconSearch} alt="" aria-hidden="true" width="18" height="18" />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="container navbar__search-row">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="navbar__search-form"
          >
            <label htmlFor="site-search" className="sr-only">
              {lang === "mr" ? "बातम्या शोधा" : "Search News"}
            </label>
            <input
              id="site-search"
              type="search"
              placeholder={
                lang === "mr"
                  ? "बातम्या, विषय किंवा व्हिडिओ शोधा..."
                  : "Search news, topics, videos..."
              }
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-submit">
              {lang === "mr" ? "शोधा" : "Search"}
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
