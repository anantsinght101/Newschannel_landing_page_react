import { NavLink } from "react-router-dom";
import { navLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function MobileCategoryScroll() {
  const { lang } = useLanguage();

  return (
    <div className="mobile-category-scroll" aria-label="News Categories">
      <div className="mobile-category-scroll__track">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `mobile-category-pill${isActive ? " active" : ""}`
            }
          >
            {link.label[lang]}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
