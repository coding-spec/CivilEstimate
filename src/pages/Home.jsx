import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      {/* Hero Section */}
      <section className={`home page ${mounted ? "enter" : ""}`}>
        <div className="overlay"></div>
        <div className="home-inner container">
          <h1 className="home-title">Civil Estimate — Smarter Projects</h1>
          <p className="home-subtitle">
            Estimate costs, manage resources, and streamline construction projects efficiently.
          </p>

          <div className="home-cta-row">
            <Link to="/estimate" className="btn cta">Create Estimate</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
            <Link to="/signup" className="btn-secondary">Signup</Link>
          </div>

          <div className="features">
            <div className="feature">
              <h4>Accurate Cost Estimates</h4>
              <p>Detailed calculations for materials, labor, and equipment.</p>
            </div>
            <div className="feature">
              <h4>Resource Management</h4>
              <p>Track resources, schedule tasks, and stay organized.</p>
            </div>
            <div className="feature">
              <h4>Cloud Storage</h4>
              <p>Access your projects anywhere, anytime with real-time updates.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
