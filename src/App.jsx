import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { useMobileDetector } from "./hooks/useMobileDetector";
import DesktopLayout from "./layouts/Desktop";
import MobileLayout from "./layouts/Mobile";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import "./styles/mobile.css";

export default function App() {
  const isMobile = useMobileDetector(768);

  return (
    <LanguageProvider>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Catch-all: every nav link and footer link resolves to a real route */}
            <Route path="*" element={<PlaceholderPage />} />
          </Routes>
        </DesktopLayout>
      )}
    </LanguageProvider>
  );
}
