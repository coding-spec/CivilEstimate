import React from "react";
import "../styles/policy.css";

export default function Disclaimer() {
  return (
    <section className="policy-container">
      <h2>Disclaimer</h2>
      <p>
        The information provided by <b>Civil Estimate</b> is for general
        guidance and project planning purposes only.
      </p>

      <h3>Accuracy of Information</h3>
      <p>
        While we strive to provide accurate cost estimates and resources, we
        make no guarantees regarding the accuracy, completeness, or reliability
        of the information. Actual costs may vary based on material prices,
        labor charges, and local conditions.
      </p>

      <h3>No Professional Advice</h3>
      <p>
        The content on our website does not replace advice from certified
        engineers, architects, or consultants. Users should verify details
        before making financial or construction-related decisions.
      </p>

      <h3>External Links</h3>
      <p>
        Our platform may contain links to third-party websites. We are not
        responsible for the content, accuracy, or policies of external sites.
      </p>

      <h3>Liability</h3>
      <p>
        Civil Estimate is not liable for any damages, delays, or losses
        resulting from the use of our estimates, maps, or reports.
      </p>

      <h3>Contact</h3>
      <p>
        For disclaimer-related questions, contact us at{" "}
        <a href="mailto:civilestimate1212@gmail.com">civilestimate1212@gmail.com</a>.
      </p>
    </section>
  );
}
