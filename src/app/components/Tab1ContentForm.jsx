import React from "react";

export function Tab1ContentForm() {
  return (
    <>
      <section className="contact-form-tab">
        <div className="form-box">
          <form className="form">
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
              <label>Unite*</label>
            </div>

            <div className="form-group full-width">
              <label className="contact-mode-label">
                Preferred Mode of Contact
              </label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="contactMode"
                    value="phone"
                    required
                  />
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
