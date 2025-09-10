// src/pages/SavedEstimates.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SavedEstimates() {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "estimates"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEstimates(list);
      } catch (error) {
        console.error("Error fetching estimates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  if (loading) return <p>Loading saved estimates...</p>;

  return (

    <div className="saved-estimates">
      <h2>Saved Estimates</h2>
      {estimates.length === 0 ? (
        <p>No saved projects yet.</p>
      ) : (
        <ul>
          {estimates.map((estimate) => (
            <li key={estimate.id} className="estimate-card">
              <h3>{estimate.project}</h3>
              <p><strong>Total:</strong> ₹{estimate.total.toLocaleString()}</p>
              <p><strong>Saved On:</strong> {new Date(estimate.createdAt).toLocaleString()}</p>
              <details>
                <summary>View Details</summary>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Unit</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.rows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.desc}</td>
                        <td>{row.unit}</td>
                        <td>{row.qty}</td>
                        <td>{row.rate}</td>
                        <td>{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
