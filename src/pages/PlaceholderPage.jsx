import { Link, useLocation } from "react-router-dom";

/**
 * Every nav/footer link routes here (via App.jsx's catch-all route),
 * so every link is a real, working redirection instead of a dead "#" href.
 * The page title is derived from the current path, e.g. "/link-3" -> "Link 3".
 */
export default function PlaceholderPage() {
  const { pathname } = useLocation();

  const title = pathname
    .split("/")
    .filter(Boolean)
    .join(" / ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Home";

  return (
    <main id="main-content" className="page">
      <div>
        <span className="page__badge">Placeholder</span>
        <h1 className="page__title">{title}</h1>
        <p className="page__text">
          This is a placeholder page for the <strong>{pathname}</strong> route. Replace this
          component with real page content when you build out the site.
        </p>
        <Link to="/" className="page__back-link">
          Back to home
        </Link>
      </div>
    </main>
  );
}
