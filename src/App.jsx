// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Estimate from "./pages/Estimate";
import About from "./pages/About";
import HousingEstimate from "./pages/HousingEstimate";
import CommercialEstimate from "./pages/CommercialEstimate";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import SavedEstimates from "./pages/SavedEstimates";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
//import WithMap from "./pages/WithMap";
import WithoutMap from "./pages/WithoutMap";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";



function App() {
  return (
    <Router>
      <Navbar />
      <main className="page-wrap">
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/about" element={<About />} />
          <Route path="/housing" element={<HousingEstimate />} />
          <Route path="/commercial" element={<CommercialEstimate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/saved-estimates" element={<SavedEstimates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/without-map" element={<WithoutMap />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
