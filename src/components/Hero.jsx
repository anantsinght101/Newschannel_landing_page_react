import heroBanner from "../assets/hero-banner.png";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__container">
        {/* Headline Box on Left */}
        <div className="hero__headline-box">
          <div className="hero__eyebrow">
            <span className="hero__live-dot" />
            <span>{t("heroEyebrow")}</span>
          </div>
          <h1 className="hero__title" id="hero-title">
            {t("heroTitle")}
          </h1>
          <p className="hero__subtitle">{t("heroSubtitle")}</p>
        </div>

        {/* Right-aligned reduced width Hero Banner Image */}
        <div className="hero__banner-wrapper">
          <img
            src={heroBanner}
            alt={t("siteName")}
            className="hero__banner-img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
