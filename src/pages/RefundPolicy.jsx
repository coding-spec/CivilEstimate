// src/pages/RefundPolicy.jsx
import React from "react";
import "../styles/policy.css";

export default function RefundPolicy() {
  return (
    <section className="policy-container">
      <h2>Refund Policy</h2>
      <p>
        At <b>Civil Estimate</b>, customer satisfaction is our top priority.
        This Refund Policy explains when you may be eligible for a refund and
        the process involved.
      </p>

      <h3>Eligibility for Refund</h3>
      <ul>
        <li>If you made a <b>duplicate payment</b> by mistake, we will process a refund after verification.</li>
        <li>If you did not receive your purchased map(s) within the promised delivery time (24–48 hours).</li>
        <li>Refund requests must be raised within <b>7 days</b> of payment.</li>
      </ul>

      <h3>Non-Refundable Items</h3>
      <ul>
        <li>Once a map or estimate file is delivered, it <b>cannot be refunded</b>.</li>
        <li>Custom project consultations are <b>non-refundable</b>.</li>
      </ul>

      <h3>Refund Process</h3>
      <p>
        To request a refund, please email us at{" "}
        <a href="mailto:civilestimate1212@gmail.com">
          civilestimate1212@gmail.com
        </a>{" "}
        with your payment details and reason for the refund.
      </p>
      <p>
        Once approved, refunds will be credited back to your original payment method
        within <b>7–10 working days</b>.
      </p>
    </section>
  );
}
