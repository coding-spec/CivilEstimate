// src/pages/WithoutMap.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function WithoutMap() {
  const location = useLocation();
  const totalCost = location.state?.totalCost || 0;

  return (
    <section className="cost-container">
      <h2 className="cost-title">Estimate without Map (Free)</h2>

      <div className="cost-form">
        <div className="cost-total">
          Total Estimated Cost: ₹ {totalCost.toLocaleString("en-IN")}
        </div>

        <p style={{ marginTop: "20px" }}>
          This estimate is provided without detailed structure maps.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/" style={{ color: "#0b63e6" }}>← Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
