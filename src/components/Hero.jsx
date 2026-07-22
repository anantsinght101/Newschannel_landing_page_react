/**
 * Hero: plain bold heading on a white background, directly matching the
 * reference page's "SAAMTV LIVE UPDATES" heading treatment (no colored
 * banner) — the news grid is rendered right after this.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 className="hero__title" id="hero-title">
          LATEST NEWS UPDATES
        </h1>
      </div>
    </section>
  );
}
