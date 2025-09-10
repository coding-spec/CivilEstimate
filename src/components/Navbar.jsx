import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const loc = useLocation();
  return (
    <header className="navbar" role="navigation" aria-label="Main Navigation">
      <nav className="nav-inner">
        <div className="nav-left">
           <div className="flex space-x-6">
          <Link className={`nav-link ${loc.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
          <Link className={`nav-link ${loc.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
          {/* Cost Management dropdown */}
          <div className="nav-dropdown">
            <button className="nav-link dropdown-btn">Cost Management ▾</button>
            <div className="dropdown-content">
              <Link className={`nav-link ${loc.pathname === "/housing" ? "active" : ""}`} to="/housing">Housing Estimate</Link>
              <Link className={`nav-link ${loc.pathname === "/commercial" ? "active" : ""}`} to="/commercial">Commercial/Complex Estimate</Link>
            </div>
          </div>
        </div>
        </div>

        <div className="nav-center">
          <div className="brand-wrap">
            <Link to="/" className="brand">
            <h1 className="brand">Civil Estimate</h1>
            </Link>
          </div>
        </div>

        <div className="nav-right">
           <div className="flex space-x-6">
          <Link className={`nav-link ${loc.pathname === "/resources" ? "active" : ""}`} to="/resources">Resources</Link>
          <Link className={`nav-link ${loc.pathname === "/saved-estimates" ? "active" : ""}`} to="/saved-estimates">Saved Estimates</Link>
          <Link className={`nav-link ${loc.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link>
          </div>
          </div>
      </nav>
    </header>
  );
}
