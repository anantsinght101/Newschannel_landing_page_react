import Hero from "../components/Hero";
import MobileHero from "../components/MobileHero";
import DynamicNewsGrid from "../components/DynamicNewsGrid";
import { useMobileDetector } from "../hooks/useMobileDetector";

export default function Home() {
  const isMobile = useMobileDetector(768);

  return (
    <main id="main-content" className="homepage-wrapper">
      {isMobile ? <MobileHero /> : <Hero />}
      <DynamicNewsGrid />
    </main>
  );
}
