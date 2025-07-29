"use client";
import React, { useState } from "react";

export function Tab1ContentForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setMessage("✅ Message sent successfully!");
        e.target.reset();
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Form Error:", err);
      setMessage("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-tab">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="firstName" required />
            <label>First Name*</label>
          </div>

          <div className="form-group">
            <input type="text" name="lastName" required />
            <label>Last Name*</label>
          </div>

          <div className="form-group">
            <input type="tel" name="phone" required />
            <label>Phone*</label>
          </div>

          <div className="form-group">
            <input type="email" name="email" required />
            <label>Email*</label>
          </div>

          <div className="form-group">
            <select name="property" required defaultValue="">
              <option value="" disabled></option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
            </select>
            <label>Property*</label>
          </div>

          <div className="form-group">
            <select name="unit" required defaultValue="">
              <option value="" disabled></option>
              <option value="studio">Studio</option>
              <option value="1br">1 Bedroom</option>
              <option value="2br">2 Bedroom</option>
            </select>
            <label>Unit*</label>
          </div>

          <div className="form-group full-width">
            <label className="contact-mode-label">
              Preferred Mode of Contact
            </label>
            <div className="radio-group">
              <label>
                <input type="radio" name="contactMode" value="phone" />
                Phone
              </label>
              <label>
                <input type="radio" name="contactMode" value="email" />
                Email
              </label>
              <label>
                <input type="radio" name="contactMode" value="whatsapp" />
                WhatsApp
              </label>
            </div>
          </div>

          <div className="btn">
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}
