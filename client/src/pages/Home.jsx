import Hero
  from "../components/Hero";

import TrustedCompanies
  from "../components/TrustedCompanies";

import AboutSection
  from "../components/AboutSection";

import ServicesSection
  from "../components/ServicesSection";

import IndustriesSection
  from "../components/IndustriesSection";

import PortfolioSection
  from "../components/PortfolioSection";

import WhyChooseSection
  from "../components/WhyChooseSection";

import GroupCompaniesSection
  from "../components/GroupCompaniesSection";

import "./Home.css";


const Home = () => {

  return (

    <main className="home-page">


      {/* ========================================
          HERO
      ======================================== */}

      <Hero />



      {/* ========================================
          TRUSTED COMPANIES
      ======================================== */}

      <TrustedCompanies />



      {/* ========================================
          ABOUT INDILENS
      ======================================== */}

      <AboutSection />



      {/* ========================================
          SERVICES
      ======================================== */}

      <ServicesSection />



      {/* ========================================
          INDUSTRIES
      ======================================== */}

      <IndustriesSection />



      {/* ========================================
          FEATURED WORK
      ======================================== */}

      <PortfolioSection />



      {/* ========================================
          WHY CHOOSE INDILENS
      ======================================== */}

      <WhyChooseSection />



      {/* ========================================
          INDILENS GROUP COMPANIES
      ======================================== */}

      <GroupCompaniesSection />


    </main>

  );

};


export default Home;