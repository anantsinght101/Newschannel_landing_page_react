import heroBanner from "../assets/hero-banner.jpg";

/**
 * Hero component displaying the featured news banner with signature accent line
 * and high-impact editorial headline presentation.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__container">
        <div className="hero__banner-wrapper">
          <img
            src={heroBanner}
            alt="न्यूज यात्रा - ठाम परखड शोधयात्रा - संजय वरकड"
            className="hero__banner-img"
            loading="eager"
          />
        </div>
        <div className="hero__headline-box">
          <div className="hero__eyebrow">
            <span className="hero__live-dot" />
            <span>विशेष वृत्तांत</span>
          </div>
          <h1 className="hero__title" id="hero-title">
            न्यूज यात्रा — ठाम परखड शोधयात्रा
          </h1>
          <div className="hero__accent-rule" />
        </div>
      </div>
    </section>
  );
}
