import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HealthManagement from "./components/sections/HealthManagement";
import BenefitsOfUsingSheSpeaks from "./components/sections/BenefitsOfUsingSheSpeaks";
import OurMission from "./components/sections/OurMission";
import SuccessStories from "./components/sections/SuccessStories";
import ExpertsInsights from "./components/sections/ExpertsInsights";
import FAQ from "./components/sections/FAQ";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-sections">
          <HealthManagement />
          <BenefitsOfUsingSheSpeaks />
          <OurMission />
          <SuccessStories />
          <ExpertsInsights />
          <FAQ />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
