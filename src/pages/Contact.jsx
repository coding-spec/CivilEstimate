// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import "./Contact.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const db = getFirestore(getApp());

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      alert("✅ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2 data-aos="fade-down">Contact Us</h2>
      <p data-aos="fade-up" data-aos-delay="200">
        Reach out to us for expert guidance, support, or project consultation. We’ll get back to you as soon as possible.
      </p>

      <div className="contact-card" data-aos="zoom-in" data-aos-delay="400">
        <form onSubmit={handleSubmit}>
          <label data-aos="fade-right" data-aos-delay="500">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            data-aos="fade-left"
            data-aos-delay="600"
          />

          <label data-aos="fade-right" data-aos-delay="700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            data-aos="fade-left"
            data-aos-delay="800"
          />

          <label data-aos="fade-right" data-aos-delay="900">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            data-aos="fade-left"
            data-aos-delay="1000"
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
