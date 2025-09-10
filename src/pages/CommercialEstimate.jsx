// src/pages/CommercialEstimate.jsx
import React, { useMemo, useState } from "react";
import "../styles/costManagement.css";
import { Link, useNavigate } from "react-router-dom";

function parseLXb(text) {
  if (!text) return 0;
  const t = String(text).trim().replace(/\s+/g, "");
  const m = t.match(/^(\d+(\.\d+)?)[xX\*](\d+(\.\d+)?)$/);
  if (m) return Number(m[1]) * Number(m[3]);
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}

export default function CommercialEstimate() {
  const [landText, setLandText] = useState("");
  const [coveredText, setCoveredText] = useState("");
  const [floors, setFloors] = useState(1);
  const [option, setOption] = useState(""); // ✅ added
  const navigate = useNavigate();

  const rate = 2200; // fixed base price

  const landArea = useMemo(() => parseLXb(landText), [landText]);
  const coveredArea = useMemo(() => parseLXb(coveredText), [coveredText]);

  const totalCost = useMemo(() => {
    const f = Number(floors) || 0;
    return Math.max(0, (coveredArea || 0) * f * rate);
  }, [coveredArea, floors]);

  const handleProceed = () => {
    if (option === "with") {
      navigate("/with-map", { state: { totalCost, coveredArea } });
    } else if (option === "without") {
      navigate("/without-map", { state: { totalCost } });
    } else {
      alert("Please select an option first!");
    }
  };

  return (
    <section className="cost-container">
      <h2 className="cost-title">Commercial/Complex Estimate — Cost Management</h2>

      <div className="cost-form">
        <div className="cost-row">
          <label>Total Land Area (enter L*B or area)</label>
          <input
            placeholder="e.g. 60*80 or 4800"
            value={landText}
            onChange={(e) => setLandText(e.target.value)}
          />
        </div>

        <div className="cost-row">
          <label>Total Covered Area (enter L*B or area)</label>
          <input
            placeholder="e.g. 40*70 or 2800"
            value={coveredText}
            onChange={(e) => setCoveredText(e.target.value)}
          />
        </div>

        <div className="cost-row">
          <label>No. of Floors</label>
          <select value={floors} onChange={(e) => setFloors(e.target.value)}>
            {[...Array(15)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="cost-row">
          <label>Type of Requirement</label>
          <select value={rate} readOnly>
            <option value={2200}>Base Price — ₹2200</option>
          </select>
        </div>

        <div className="cost-metrics">
          <div className="metric">
            Land Area: <strong>{landArea.toLocaleString("en-IN")}</strong>
          </div>
          <div className="metric">
            Covered Area: <strong>{coveredArea.toLocaleString("en-IN")}</strong>
          </div>
        </div>


        {/* Proceed option instead of showing cost directly */}
        <div
          className="cost-row"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <label style={{ display: "block", marginBottom: "8px" }}>
            Proceed with Estimate
          </label>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="border px-4 py-2 rounded mb-4"
          >
            <option value="">-- Select Option --</option>
            <option value="without">Without Map</option>
          </select>

          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Proceed
          </button>
        </div>

        <div className="cost-note">
          * Foundation rates may vary according to the number of floors
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#0b63e6" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}