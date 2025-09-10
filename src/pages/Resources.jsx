// src/pages/Resources.jsx
import React, { useState, useEffect } from "react";
import "./Resources.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Resources() {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ name: "", quantity: "", unit: "" });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addMaterial = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.unit) return;
    setMaterials([...materials, formData]);
    setFormData({ name: "", quantity: "", unit: "" });
  };

  const removeMaterial = (index) => setMaterials(materials.filter((_, i) => i !== index));

  return (
    <div className="resources-container">
      <h2 data-aos="fade-down">Resource Management</h2>
      <p data-aos="fade-up" data-aos-delay="200">
        Track materials, quantities, and units for your construction projects.
      </p>

      <form onSubmit={addMaterial} className="resource-form" data-aos="fade-up" data-aos-delay="400">
        <input
          type="text"
          name="name"
          placeholder="Material Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit (e.g., kg, m³, pcs)"
          value={formData.unit}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Material</button>
      </form>

      <div className="materials-list" data-aos="fade-up" data-aos-delay="600">
        {materials.length === 0 ? (
          <p>No materials added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, idx) => (
                <tr key={idx} data-aos="fade-right" data-aos-delay={idx * 100}>
                  <td>{mat.name}</td>
                  <td>{mat.quantity}</td>
                  <td>{mat.unit}</td>
                  <td>
                    <button onClick={() => removeMaterial(idx)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Resources;
