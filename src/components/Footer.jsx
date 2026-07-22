import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconTwitter from "../assets/icon-social-twitter.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import FooterColumn from "./FooterColumn";
import { footerGroups, socialLinks } from "../siteData";

const iconMap = {
  "icon-social-facebook": iconFacebook,
  "icon-social-twitter": iconTwitter,
  "icon-social-instagram": iconInstagram,
  "icon-social-youtube": iconYoutube,
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <Link to="/" className="footer__brand" aria-label="Go to homepage">
          <img src={logo} alt="News Yatra Logo" className="footer__logo-img" width="56" height="56" />
          <div className="footer__brand-text">
            <span className="footer__brand-name">न्यूज यात्रा</span>
            <span className="footer__brand-tagline">हे आहे आपलं चॅनल!</span>
          </div>
        </Link>

        <div className="footer__social-block">
          <span className="footer__follow-label">आमच्याशी जोडा</span>
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
                    width="20"
                    height="20"
                    className="footer__social-icon"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__columns">
        {footerGroups.map((group) => (
          <FooterColumn key={group.heading} heading={group.heading} links={group.links} />
        ))}
      </div>

      <div className="container footer__bottom">
        <span>&copy; {new Date().getFullYear()} न्यूज यात्रा. सर्व हक्क सुरक्षित.</span>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Powered by Digital News Network
        </a>
      </div>
    </footer>
  );
}
