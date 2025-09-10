// src/pages/WithMap.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";

export default function WithMap({ userId, firebaseApp }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { coveredArea = 0 } = location.state || {};

  // Redirect if essential data missing
  useEffect(() => {
    if (!coveredArea) navigate("/");
  }, [coveredArea, navigate]);

  const mapRate = 14;        // ₹14 per sqft
  const discountPerSqft = 4; // ₹4 discount per sqft
  const mapCost = coveredArea * (mapRate - discountPerSqft);
  const finalCost = mapCost; // Only map cost

  const [paid, setPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const db = getFirestore(firebaseApp);
   
  // Save payment in Firestore
  const savePayment = async (method) => {
    try {
      await addDoc(collection(db, "payments"), {
        userId,
        amount: finalCost,
        method,
        date: new Date(),
        status: "success",
      });
    } catch (err) {
      console.error("Error saving payment: ", err);
    }
  };

  // Download invoice PDF
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Housing/Commercial Map Payment Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Covered Area: ${coveredArea} sqft`, 20, 40);
    doc.text(
      `Map Cost (₹${mapRate} - ₹${discountPerSqft} discount): ₹${mapCost.toLocaleString(
        "en-IN"
      )}`,
      20,
      50
    );
    doc.text(
      `Final Cost: ₹${finalCost.toLocaleString("en-IN")}`,
      20,
      60
    );
    doc.text(`Payment Method: ${paymentMethod}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 80);
    doc.save("Invoice.pdf");
  };

  // Razorpay handler
  const handleRazorpay = (method) => {
    setPaymentMethod(method);
    if (!window.Razorpay) {
      alert("Razorpay script not loaded! Add it to index.html");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: finalCost * 100, // in paisa
      currency: "INR",
      name: "Housing/Commercial Map Payment",
      description: "Map cost",
      handler: function () {
        setPaid(true);
        savePayment(method);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#0b63e6" },
    };
    new window.Razorpay(options).open();
  };

  return (
    <section
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "'Roboto', sans-serif",
        padding: "0 15px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#0b63e6",
            marginBottom: "20px",
          }}
        >
          Complete Payment
        </h2>

        {!paid ? (
          <>
            <div
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "20px",
                textAlign: "center",
                background: "#f9f9f9",
                fontWeight: "500",
              }}
            >
              <div>Amount to Pay</div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  color: "#0b63e6",
                }}
              >
                ₹ {finalCost.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Razorpay Button */}
            <div
              onClick={() => handleRazorpay("Razorpay")}
              style={{
                textAlign: "center",
                padding: "14px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: "#0b63e6",
                color: "#fff",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              Pay Now
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#777",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              After payment, you will receive the structure map in 24 hours and
              plumbing, electrical & drainage maps in 48 hours.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#0b63e6",
              }}
            >
              ✅ Payment Successful!
            </p>
            <div style={{ marginTop: "15px", fontSize: "16px" }}>
              Map Cost: ₹ {mapCost.toLocaleString("en-IN")}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0b63e6",
                marginTop: "15px",
              }}
            >
              Final Cost: ₹ {finalCost.toLocaleString("en-IN")}
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#555",
                marginTop: "15px",
              }}
            >
              After 24 hours you will receive the structure map and after 48
              hours the plumbing, electrical & drainage maps (5 samples each).
            </p>
            <button
              onClick={downloadInvoice}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#0b63e6",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Download Invoice
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Link
            to="/"
            style={{
              color: "#0b63e6",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
