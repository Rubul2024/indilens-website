import GroupCompaniesSection
  from "../components/GroupCompaniesSection";

import "./GroupCompanies.css";
import SEO from "../components/SEO";


const GroupCompanies = () => {

  return (

    <main className="group-companies-page">

      <GroupCompaniesSection />

      <SEO
  title="Group Companies | Indilens"
  description="Discover the companies and business ventures associated with the Indilens group and explore our diverse digital and business capabilities."
  canonical="/group-companies"
/>

    </main>

  );

};


export default GroupCompanies;