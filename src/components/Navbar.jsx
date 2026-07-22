import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { navLinks } from "../siteData";

/**
 * Site header: logo (left) + horizontal nav link list (right),
 * matching the source layout of a single-row navbar with many links.
 * Collapses into a toggled mobile menu below 720px (see index.css).
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo-link" aria-label="Go to homepage">
          <img src={logo} alt="Brand logo" width="120" height="48" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary">
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
      </div>
    </header>
  );
}
