import React from "react";

export function Contact() {
  return (
    <>
      <section className="contact">
        <div className="container">
          <div className="flex-box">
            <div className="text-box">
              <h2 className="title-3">Did You Find Your Dream Home?</h2>
              <p className="text-1">
                Thank you for getting in touch! if you find your dream home
                connect with us
              </p>
            </div>
            <div className="form-box">
              <form className="form">
                <div className="form-group">
                  <input type="text" name="name" required />
                  <label>Your Name</label>
                </div>

                <div className="form-group">
                  <input type="email" name="email" required />
                  <label>Your Email</label>
                </div>

                <div className="form-group">
                  <input type="tel" name="phone" required />
                  <label>Phone Number</label>
                </div>

                <div className="form-group">
                  <select required defaultValue="">
                    <option value="" disabled></option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                  <label>Interested In</label>
                </div>

                <div className="form-group full-width">
                  <textarea name="message" required></textarea>
                  <label>Message</label>
                </div>
                <div className="btn">
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
