import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function FooterColumn({ heading, links }) {
  const { lang } = useLanguage();

  return (
    <div className="footer-column">
      <h2 className="footer-column__heading">{heading[lang]}</h2>
      <ul className="footer-column__list">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="footer-column__link">
              {link.label[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
