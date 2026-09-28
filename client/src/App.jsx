import { lazy, Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// ========================================
// PUBLIC COMPONENTS
// ========================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// ========================================
// PUBLIC PAGES
// ========================================

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import GroupCompanies from "./pages/GroupCompanies";
import Portfolio from "./pages/Portfolio";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";

// ========================================
// ADMIN (separate chunk, loaded only on /admin)
// ========================================

const AdminApp = lazy(() => import("./admin/AdminApp"));

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
    <ScrollToTopButton />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/group-companies" element={<GroupCompanies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
