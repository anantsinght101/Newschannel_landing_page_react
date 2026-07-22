import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
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
        <Link to="/" aria-label="Go to homepage">
          <img src={logo} alt="Brand logo" width="120" height="48" />
        </Link>

        <div>
          <span className="footer__follow-label">FOLLOW US</span>
          <ul className="footer__social">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.to}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={iconMap[social.icon]}
                    alt={`${social.label} icon`}
                    width="24"
                    height="24"
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
        <span>Copyright &copy; {new Date().getFullYear()} Company Name – All Rights Reserved</span>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Powered by Platform Name
        </a>
      </div>
    </footer>
  );
}
