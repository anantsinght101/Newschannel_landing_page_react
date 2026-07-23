import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconGmail from "../assets/icon-social-gmail.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import iconWhatsapp from "../assets/icon-social-whatsapp.svg";
import { footerGroups, socialLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  "icon-social-facebook": iconFacebook,
  "icon-social-gmail": iconGmail,
  "icon-social-instagram": iconInstagram,
  "icon-social-youtube": iconYoutube,
  "icon-social-whatsapp": iconWhatsapp,
};

export default function MobileFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="mobile-footer">
      <div className="mobile-container mobile-footer__inner">
        {/* Brand Display */}
        <Link to="/" className="mobile-footer__brand" aria-label="Go to homepage">
          <img src={logo} alt="News Yatra Logo" className="mobile-footer__logo-img" />
          <div className="mobile-footer__brand-text">
            <span className="mobile-footer__brand-name">
              {lang === "mr" ? "न्यूज यात्रा" : "NEWS YATRA"}
            </span>
            <span className="mobile-footer__brand-tagline">
              {lang === "mr" ? "हे आहे आपलं चॅनल!" : "Independent News Channel"}
            </span>
          </div>
        </Link>

        {/* Social Bar */}
        <div className="mobile-footer__social-section">
          <span className="mobile-footer__social-label">
            {lang === "mr" ? "आमच्याशी जोडा" : "FOLLOW US"}
          </span>
          <ul className="mobile-footer__social-list">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="mobile-footer__social-link"
                >
                  <img
                    src={iconMap[social.icon]}
                    alt={`${social.label} icon`}
                    className="mobile-footer__social-icon"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Vertically Stacked Link Groups */}
        <div className="mobile-footer__groups">
          {footerGroups.map((group, idx) => (
            <div key={idx} className="mobile-footer__group">
              <h3 className="mobile-footer__group-heading">{group.heading[lang]}</h3>
              <ul className="mobile-footer__group-list">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="mobile-footer__group-link">
                      {link.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="mobile-footer__bottom">
          <p className="mobile-footer__copyright">
            &copy; {new Date().getFullYear()}{" "}
            {lang === "mr"
              ? "न्यूज यात्रा. सर्व हक्क सुरक्षित."
              : "News Yatra. All Rights Reserved."}
          </p>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-footer__credit"
          >
            Powered by Digital News Network
          </a>
        </div>
      </div>
    </footer>
  );
}
