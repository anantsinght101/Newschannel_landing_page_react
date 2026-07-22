import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Catch-all: every nav link and footer link resolves to a real route */}
        <Route path="*" element={<PlaceholderPage />} />
      </Routes>
      <Footer />
    </>
  );
}
