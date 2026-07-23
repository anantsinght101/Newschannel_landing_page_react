import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconTwitter from "../assets/icon-social-twitter.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import iconWhatsapp from "../assets/icon-social-whatsapp.svg";
import FooterColumn from "./FooterColumn";
import { footerGroups, socialLinks } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  "icon-social-facebook": iconFacebook,
  "icon-social-twitter": iconTwitter,
  "icon-social-instagram": iconInstagram,
  "icon-social-youtube": iconYoutube,
  "icon-social-whatsapp": iconWhatsapp,
};

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer__top">
        <Link to="/" className="footer__brand" aria-label="Go to homepage">
          <img src={logo} alt="News Yatra Logo" className="footer__logo-img" width="56" height="56" />
          <div className="footer__brand-text">
            <span className="footer__brand-name">
              {lang === "mr" ? "न्यूज यात्रा" : "NEWS YATRA"}
            </span>
            <span className="footer__brand-tagline">
              {lang === "mr" ? "हे आहे आपलं चॅनल!" : "Independent News"}
            </span>
          </div>
        </Link>

        {/* Contact info & Social links */}
        <div className="footer__social-block">
          <div className="footer__contact-info">
            <span className="footer__contact-label">
              {lang === "mr" ? "संपर्क क्र. / WhatsApp:" : "Contact / WhatsApp:"}
            </span>
            <a
              href="https://wa.me/919764444001"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-phone"
            >
              📞 9764444001
            </a>
          </div>

          <span className="footer__follow-label">
            {lang === "mr" ? "आमच्याशी जोडा" : "FOLLOW US"}
          </span>
          <ul className="footer__social">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.to}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <img
                    src={iconMap[social.icon]}
                    alt={`${social.label} icon`}
                    width="18"
                    height="18"
                    className="footer__social-icon"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__columns">
        {footerGroups.map((group, index) => (
          <FooterColumn key={index} heading={group.heading} links={group.links} />
        ))}
      </div>

      <div className="container footer__bottom">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          {lang === "mr"
            ? "न्यूज यात्रा. सर्व हक्क सुरक्षित."
            : "News Yatra. All Rights Reserved."}
        </span>
        <a
          href="https://wa.me/919764444001"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__phone-link"
        >
          {lang === "mr" ? "संपर्क: ९७६४४४४००१" : "Contact: 9764444001"}
        </a>
      </div>
    </footer>
  );
}
