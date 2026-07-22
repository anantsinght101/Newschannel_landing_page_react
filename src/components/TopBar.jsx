import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconTwitter from "../assets/icon-social-twitter.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconWhatsapp from "../assets/icon-social-whatsapp.svg";
import iconNewsfeed from "../assets/icon-social-newsfeed.svg";
import { topBarSocialLinks, utilityLinks } from "../siteData";

const iconMap = {
  "icon-social-facebook": iconFacebook,
  "icon-social-twitter": iconTwitter,
  "icon-social-youtube": iconYoutube,
  "icon-social-instagram": iconInstagram,
  "icon-social-whatsapp": iconWhatsapp,
  "icon-social-newsfeed": iconNewsfeed,
};

/**
 * Top utility bar: social icons (left) + centered logo + text links (right).
 * This is a separate row above the main category navbar, matching the
 * reference site's header structure.
 */
export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <ul className="topbar__social">
          {topBarSocialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.to}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <img src={iconMap[social.icon]} alt={`${social.label} icon`} width="22" height="22" />
              </a>
            </li>
          ))}
        </ul>

        <Link to="/" className="topbar__logo-link" aria-label="Go to homepage">
          <img src={logo} alt="Brand logo" width="110" height="44" />
        </Link>

        <ul className="topbar__links">
          {utilityLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
