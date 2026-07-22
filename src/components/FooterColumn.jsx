import { Link } from "react-router-dom";

/**
 * One reusable footer link-group component, fed different data,
 * instead of writing four near-identical footer blocks.
 */
export default function FooterColumn({ heading, links }) {
  return (
    <div className="footer-column">
      <h2 className="footer-column__heading">{heading}</h2>
      <ul className="footer-column__list">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="footer-column__link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
