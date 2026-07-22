import { useState } from "react";
import { NavLink } from "react-router-dom";
import iconHamburger from "../assets/icon-hamburger.svg";
import iconSearch from "../assets/icon-search.svg";
import iconTheme from "../assets/icon-theme-toggle.svg";
import { navLinks } from "../siteData";

/**
 * Main category navbar: hamburger icon (left) + the 12 nav links, then
 * search + theme-toggle icons (right) — mirroring the reference site's
 * dedicated nav row (logo lives in <TopBar />, not here).
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          aria-label="Primary"
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
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-btn"
            aria-expanded={isSearchOpen}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            onClick={() => setIsSearchOpen((open) => !open)}
          >
            <img src={iconSearch} alt="" aria-hidden="true" width="18" height="18" />
          </button>
          <button type="button" className="navbar__icon-btn" aria-label="Toggle dark mode">
            <img src={iconTheme} alt="" aria-hidden="true" width="18" height="18" />
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
              Search
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search placeholder text"
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-submit">
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
