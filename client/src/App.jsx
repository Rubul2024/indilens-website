import { BrowserRouter, Routes, Route } from "react-router-dom";

// ========================================
// ADMIN PAGES
// ========================================

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";

// ========================================
// PUBLIC COMPONENTS
// ========================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
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

        {/* ADMIN */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
