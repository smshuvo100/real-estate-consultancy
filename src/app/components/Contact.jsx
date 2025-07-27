"use client";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <motion.div
          className="flex-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-box"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="title-3">Did You Find Your Dream Home?</h2>
            <p className="text-1">
              Thank you for getting in touch! If you find your dream home,
              connect with us.
            </p>
          </motion.div>

          <motion.div
            className="form-box"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
                <button type="submit">Submit</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
