import heroBanner from "../assets/hero-banner.png";
import { heroContent } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function MobileHero() {
  const { lang } = useLanguage();
  const content = heroContent[lang] || heroContent.mr;

  return (
    <section className="mobile-hero" aria-labelledby="mobile-hero-title">
      <div className="mobile-hero__card">
        {/* 16:9 Aspect Ratio Landscape Image */}
        <div className="mobile-hero__image-wrapper">
          <img
            src={heroBanner}
            alt="News Yatra Featured Story"
            className="mobile-hero__img"
            loading="eager"
          />
        </div>

        {/* Content Box */}
        <div className="mobile-hero__content">
          <div className="mobile-hero__eyebrow">
            <span className="mobile-hero__live-dot" />
            <span>{content.eyebrow}</span>
          </div>

          {/* Headline 26-30px, max 3 lines */}
          <h1 className="mobile-hero__title" id="mobile-hero-title">
            {content.title}
          </h1>

          <div className="mobile-hero__accent-rule" />

          {/* Summary 2 lines max */}
          <p className="mobile-hero__subtitle">{content.subtitle}</p>

          <button type="button" className="mobile-hero__btn">
            {content.readMore}
          </button>
        </div>
      </div>
    </section>
  );
}
