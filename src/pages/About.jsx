// src/pages/About.jsx
import React from "react";
import "./About.css"; // we'll create this file

function About() {
  const whyImportant = [
    "Provide a clear idea of the total project cost before execution.",
    "Help in arranging funds and financial planning.",
    "Guide project scheduling and proper allocation of resources.",
    "Avoid unexpected expenses and cost overruns.",
    "Assist in bidding, tendering, and contract negotiations.",
    "Ensure transparency between clients, engineers, and contractors.",
    "Enable comparison between different design or material options.",
  ];

  const types = [
    { title: "Preliminary Estimate", desc: "Rough cost for project approval." },
    { title: "Detailed Estimate", desc: "Complete breakdown of material, labor, and equipment." },
    { title: "Revised Estimate", desc: "Prepared when there are changes in scope or design." },
    { title: "Supplementary Estimate", desc: "For additional works not covered in the original." },
    { title: "Annual Repair & Maintenance Estimate", desc: "For recurring upkeep costs." },
  ];

  const features = [
    "User-friendly interface designed for engineers and contractors.",
    "Accurate calculation of quantities, costs, and resources.",
    "Ability to save, update, and manage multiple project estimates.",
    "Cloud-based storage using Firebase for security and accessibility.",
    "Time-saving automation of repetitive calculations.",
    "Customizable templates for different types of projects.",
  ];

  const users = [
    "Civil Engineers",
    "Contractors & Builders",
    "Project Managers",
    "Architecture & Engineering Students",
    "Clients who want a clear view of construction costs",
  ];

  return (
    <div className="about-container">
      <h2 className="about-header">About Civil Estimates</h2>

      <p className="about-intro">
        Civil Estimates play a vital role in every construction project. They are not just about cost, but also about planning, resource management, and the amount of material required also ensuring that a project is feasible within time and budget.
      </p>

      <section>
        <h3>Why Civil Estimates are Important?</h3>
        <div className="card-grid">
          {whyImportant.map((item, idx) => (
            <div key={idx} className="card">{item}</div>
          ))}
        </div>
      </section>

      <section>
        <h3>Types of Civil Estimates</h3>
        <div className="card-grid">
          {types.map((item, idx) => (
            <div key={idx} className="card">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Features of Our Civil Estimate Tool</h3>
        <div className="card-grid">
          {features.map((item, idx) => (
            <div key={idx} className="card">{item}</div>
          ))}
        </div>
      </section>

      <section>
        <h3>Our Mission</h3>
        <div className="card mission-card">
          <p>
            Our goal is to simplify civil project estimation by providing a modern, reliable, and efficient platform. We aim to empower civil engineers, contractors, architects, and students with tools that make project planning faster, smarter, and more transparent.
          </p>
        </div>
      </section>

      <section>
        <h3>Who Can Use This Tool?</h3>
        <div className="card-grid">
          {users.map((item, idx) => (
            <div key={idx} className="card">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
