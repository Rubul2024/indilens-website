import { BrowserRouter, Routes, Route } from "react-router-dom";

// ========================================
// ADMIN DASHBOARD NAVIGATION PAGES
// ========================================
import AdminBlogDetails from "./admin/pages/AdminBlogDetails";
import AdminBlogForm from "./admin/pages/AdminBlogForm";
import AdminContacts from "./admin/pages/AdminContacts";
import AdminNewsletter from "./admin/pages/AdminNewsletter";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminServices from "./admin/pages/AdminServices";
import AdminServiceForm from "./admin/pages/AdminServiceForm";
import AdminServiceView from "./admin/pages/AdminServiceView";
import AdminPortfolio from "./admin/pages/AdminPortfolio";
import AdminPortfolioForm from "./admin/pages/AdminPortfolioForm";
import AdminFAQ from "./admin/pages/AdminFAQ";
import AdminFAQForm from "./admin/pages/AdminFAQForm";
import AdminFAQView from "./admin/pages/AdminFAQView";
import AdminTeam from "./admin/pages/AdminTeam";
import AdminChangePassword from "./admin/pages/AdminChangePassword";


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

        <Route path="/admin/contacts" element={<AdminContacts />} />

        <Route path="/admin/newsletter" element={<AdminNewsletter />} />

        <Route path="/admin/blogs" element={<AdminBlogs />} />

        <Route path="/admin/blogs/create" element={<AdminBlogForm />} />

        <Route path="/admin/blogs/edit/:id" element={<AdminBlogForm />} />

        <Route path="/admin/blogs/view/:id" element={<AdminBlogDetails />} />

        <Route path="/admin/services" element={<AdminServices />} />

        <Route path="/admin/services/create" element={<AdminServiceForm />} />

        <Route path="/admin/services/edit/:id" element={<AdminServiceForm />} />

        <Route path="/admin/services/:id" element={<AdminServiceView />} />

        <Route path="/admin/services/:id/edit" element={<AdminServiceForm />} />

        <Route path="/admin/portfolio" element={<AdminPortfolio />} />

        <Route
          path="/admin/portfolio/create"
          element={<AdminPortfolioForm />}
        />

        <Route
          path="/admin/portfolio/edit/:id"
          element={<AdminPortfolioForm />}
        />

        <Route path="/admin/faq" element={<AdminFAQ />} />

        <Route path="/admin/faq/create" element={<AdminFAQForm />} />

        <Route path="/admin/faq/edit/:id" element={<AdminFAQForm />} />
        <Route path="/admin/faq/view/:id" element={<AdminFAQView />} />

        <Route path="/admin/team" element={<AdminTeam />} />
        <Route
          path="/admin/change-password"
          element={<AdminChangePassword />}
        />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </BrowserRouter>
  );
};

export default App;
