import heroBanner from "../assets/hero-banner.jpg";
import { heroContent } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const content = heroContent[lang] || heroContent.mr;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__container">
        {/* Headline Box on Left */}
        <div className="hero__headline-box">
          <div className="hero__eyebrow">
            <span className="hero__live-dot" />
            <span>{content.eyebrow}</span>
          </div>
          <h1 className="hero__title" id="hero-title">
            {content.title}
          </h1>
          <p className="hero__subtitle">{content.subtitle}</p>
        </div>

        {/* Right-aligned reduced width Hero Banner Image */}
        <div className="hero__banner-wrapper">
          <img
            src={heroBanner}
            alt="न्यूज यात्रा - ठाम परखड शोधयात्रा - संजय वरकड"
            className="hero__banner-img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
