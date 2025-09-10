// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Civil Estimate — Built with ❤️</small>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
            <a href="/disclaimer">Disclaimer</a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
