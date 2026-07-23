import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconTwitter from "../assets/icon-social-twitter.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconWhatsapp from "../assets/icon-social-whatsapp.svg";
import iconNewsfeed from "../assets/icon-social-newsfeed.svg";
import { topBarSocialLinks, utilityLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  "icon-social-facebook": iconFacebook,
  "icon-social-twitter": iconTwitter,
  "icon-social-youtube": iconYoutube,
  "icon-social-instagram": iconInstagram,
  "icon-social-whatsapp": iconWhatsapp,
  "icon-social-newsfeed": iconNewsfeed,
};

export default function TopBar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="topbar">
      <div className="container topbar__inner">
        {/* Social Links */}
        <ul className="topbar__social">
          {topBarSocialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.to}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="topbar__social-link"
              >
                <img
                  src={iconMap[social.icon]}
                  alt={`${social.label} icon`}
                  width="20"
                  height="20"
                  className="topbar__social-icon"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Brand Logo & Title */}
        <Link to="/" className="topbar__logo-link" aria-label="News Yatra Homepage">
          <img
            src={logo}
            alt="News Yatra Logo"
            className="topbar__logo-img"
            width="60"
            height="60"
          />
          <div className="topbar__brand-box">
            <span className={`topbar__brand-title ${lang === "mr" ? "topbar__brand-title--mr" : ""}`}>
              {t("siteName")}
            </span>
            <span className="topbar__brand-subtitle">{t("siteTagline")}</span>
          </div>
        </Link>

        {/* Right Utility Bar */}
        <div className="topbar__right">
          {/* Language Switcher */}
          <div className="lang-switcher" role="group" aria-label={t("selectLanguage")}>
            <button
              type="button"
              className={`lang-btn${lang === "mr" ? " lang-btn--active" : ""}`}
              onClick={() => setLang("mr")}
            >
              मराठी
            </button>
            <span className="lang-divider">|</span>
            <button
              type="button"
              className={`lang-btn${lang === "en" ? " lang-btn--active" : ""}`}
              onClick={() => setLang("en")}
            >
              ENG
            </button>
          </div>

          {/* Utility Navigation Links */}
          <ul className="topbar__links">
            {utilityLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label[lang] || link.label.mr}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
