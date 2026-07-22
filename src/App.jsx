import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { useMobileDetector } from "./hooks/useMobileDetector";
import DesktopLayout from "./layouts/Desktop";
import MobileLayout from "./layouts/Mobile";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAuth from "./components/RequireAuth";
import "./styles/mobile.css";
import "./styles/admin.css";

export default function App() {
  const isMobile = useMobileDetector(768);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          {/* Main Application Routes */}
          <Route
            path="*"
            element={
              isMobile ? (
                <MobileLayout />
              ) : (
                <DesktopLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<PlaceholderPage />} />
                  </Routes>
                </DesktopLayout>
              )
            }
          />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  );
}
