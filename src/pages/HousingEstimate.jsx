// src/pages/HousingEstimate.jsx
import React, { useMemo, useState } from "react";
import "../styles/costManagement.css";
import { Link, useNavigate } from "react-router-dom";

// 🔹 Firestore imports
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

/** parse "L*B" or "LxB" or a single number */
function parseLXb(text) {
  if (!text) return 0;
  const t = String(text).trim().replace(/\s+/g, "");
  const m = t.match(/^(\d+(\.\d+)?)[xX\*](\d+(\.\d+)?)$/);
  if (m) return Number(m[1]) * Number(m[3]);
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}

export default function HousingEstimate() {
  const [landText, setLandText] = useState("");
  const [coveredText, setCoveredText] = useState("");
  const [floors, setFloors] = useState(1);
  const [rate, setRate] = useState(1600); // default Unfurnished
  const [option, setOption] = useState(""); // ✅ FIXED

  const navigate = useNavigate(); // ✅ FIXED
  const db = getFirestore(getApp()); // 🔹 Firestore DB instance

  const landArea = useMemo(() => parseLXb(landText), [landText]);
  const coveredArea = useMemo(() => parseLXb(coveredText), [coveredText]);

  const totalCost = useMemo(() => {
    const f = Number(floors) || 0;
    const r = Number(rate) || 0;
    return Math.max(0, (coveredArea || 0) * f * r);
  }, [coveredArea, floors, rate]);

  // 🔹 Updated handleProceed to also save data into Firestore
  const handleProceed = async () => {
    if (!option) {
      alert("Please select an option first!");
      return;
    }

    try {
      await addDoc(collection(db, "housingEstimates"), {
        landArea,
        coveredArea,
        floors: Number(floors),
        requirementType:
          rate === 1600 ? "Unfurnished" : rate === 1800 ? "Semi-Furnished" : "Furnished",
        rate,
        totalCost,
        option,
        timestamp: serverTimestamp(),
      });

      if (option === "with") {
        navigate("/with-map", { state: { totalCost, coveredArea } }); // ✅ pass coveredArea
      } else if (option === "without") {
        navigate("/without-map", { state: { totalCost, coveredArea } }); // ✅ pass coveredArea
      }
    } catch (err) {
      console.error("Error saving estimate:", err);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <section className="cost-container">
      <h2 className="cost-title">Housing Estimate — Cost Management</h2>

      <div className="cost-form">
        <div className="cost-row">
          <label>Total Land Area (enter L*B or area)</label>
          <input
            placeholder="e.g. 40*60 or 2400"
            value={landText}
            onChange={(e) => setLandText(e.target.value)}
          />
        </div>

        <div className="cost-row">
          <label>Total Covered Area (enter L*B or area)</label>
          <input
            placeholder="e.g. 30*50 or 1500"
            value={coveredText}
            onChange={(e) => setCoveredText(e.target.value)}
          />
        </div>

        <div className="cost-row">
          <label>No. of Floors</label>
          <select value={floors} onChange={(e) => setFloors(e.target.value)}>
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="cost-row">
          <label>Type of Requirement</label>
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            <option value={1600}>Unfurnished — ₹1600</option>
            <option value={1800}>Semi-Furnished — ₹1800</option>
            <option value={2000}>Furnished — ₹2000</option>
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

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#0b63e6" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
