import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { useMobileDetector } from "./hooks/useMobileDetector";
import DesktopLayout from "./layouts/Desktop";
import MobileLayout from "./layouts/Mobile";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CategoriesOverview from "./pages/CategoriesOverview";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import PlaceholderPage from "./pages/PlaceholderPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAuth from "./components/RequireAuth";
import "./styles/mobile.css";
import "./styles/admin.css";
import "./styles/article.css";

const categoryRoutes = [
  "latest",
  "maharashtra",
  "politics",
  "sports",
  "entertainment",
  "business",
  "tech",
  "agriculture",
  "interviews",
  "others",
  "special",
  "global",
];

export default function App() {
  const isMobile = useMobileDetector(768);

  const Layout = ({ children }) =>
    isMobile ? (
      <MobileLayout>{children}</MobileLayout>
    ) : (
      <DesktopLayout>{children}</DesktopLayout>
    );

  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          {/* Admin Protected Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          {/* Main Application Content Routes wrapped in Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  {/* Homepage */}
                  <Route path="/" element={<Home />} />

                  {/* Task 6: Categories Overview Page */}
                  <Route path="/categories" element={<CategoriesOverview />} />

                  {/* Contact Us Page */}
                  <Route path="/contact" element={<Contact />} />

                  {/* Individual Article Page */}
                  <Route path="/article/:id" element={<ArticleDetail />} />

                  {/* Dynamic Category Routes */}
                  {categoryRoutes.map((slug) => (
                    <Route
                      key={slug}
                      path={`/${slug}`}
                      element={<CategoryPage routeCategorySlug={slug} />}
                    />
                  ))}
                  <Route
                    path="/category/:categorySlug"
                    element={<CategoryPage />}
                  />

                  {/* Catch-all for utility links & unknown paths */}
                  <Route path="*" element={<PlaceholderPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  );
}
