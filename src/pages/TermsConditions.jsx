// src/pages/TermsConditions.jsx
import React from "react";
import "../styles/policy.css";

export default function TermsConditions() {
  return (
    <section className="policy-container">
      <h2>Terms & Conditions</h2>
      <p>
        Welcome to <b>Civil Estimate</b>. By using our website and services, you
        agree to the following terms and conditions. Please read them carefully
        before proceeding.
      </p>

      <h3>Use of Service</h3>
      <ul>
        <li>
          Our estimates are intended for <b>informational purposes</b> and may
          vary based on real market conditions.
        </li>
        <li>
          You agree not to misuse our platform for fraudulent activities or
          reselling data.
        </li>
        <li>
          Access to some services may require account registration.
        </li>
      </ul>

      <h3>Payments</h3>
      <ul>
        <li>All payments must be made via our approved payment gateways.</li>
        <li>
          Once delivered, digital products (maps/estimates) are{" "}
          <b>non-refundable</b> unless stated in our Refund Policy.
        </li>
      </ul>

      <h3>Limitation of Liability</h3>
      <p>
        Civil Estimate shall not be held responsible for any direct or indirect
        loss arising from the use of our estimates, maps, or project reports.
      </p>

      <h3>Changes to Terms</h3>
      <p>
        We reserve the right to update these terms at any time. Continued use of
        our website after updates means you agree to the revised terms.
      </p>

      <h3>Contact</h3>
      <p>
        For any questions about these Terms & Conditions, contact us at{" "}
        <a href="mailto:civilestimate1212@gmail.com">
          civilestimate1212@gmail.com
        </a>.
      </p>
    </section>
  );
}
