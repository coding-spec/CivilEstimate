// src/pages/PrivacyPolicy.jsx
import React from "react";
import "../styles/policy.css";

export default function PrivacyPolicy() {
  return (
    <section className="policy-container">
      <h2>Privacy Policy</h2>
      <p>
        At <b>Civil Estimate</b>, we value your privacy. This Privacy Policy
        describes how we collect, use, and protect your information.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Personal details (name, email, phone number, address).</li>
        <li>Project details (covered area, floors, furnishing preferences).</li>
        <li>Payment details (securely processed via payment gateways).</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <ul>
        <li>To generate accurate project cost estimates.</li>
        <li>To process secure payments for maps and estimates.</li>
        <li>To send invoices, receipts, and project updates.</li>
        <li>To improve our website and customer experience.</li>
      </ul>

      <h3>Data Protection</h3>
      <p>
        We do not sell, rent, or share your personal information with third parties
        except trusted payment gateways and service providers required to deliver
        our services.
      </p>

      <h3>Cookies</h3>
      <p>
        Our website may use cookies to enhance user experience. You can disable
        cookies in your browser settings.
      </p>

      <h3>Contact</h3>
      <p>
        For privacy-related questions, contact us at:{" "}
        <a href="mailto:civilestimate1212@gmail.com">civilestimate1212@gmail.com</a>
      </p>
    </section>
  );
}
