"use client";
import React from "react";
import { motion } from "framer-motion";

export function StrategicPartnerships() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="sp-section">
      <div className="container">
        <div className="sp-card">
          <div className="sp-grid">
            {/* LEFT: intro + image */}
            <motion.div
              className="sp-left"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p className="sp-intro" variants={fadeUp}>
                SFK Real Estate Consultancy has established strategic
                partnerships with industry leaders across various sectors to
                enhance our development capabilities and deliver exceptional
                value.
              </motion.p>

              <motion.figure className="sp-figure" variants={fadeUp}>
                <img
                  src="/images/sfk1.webp"
                  alt="Handshake – Strategic Partnerships"
                />
              </motion.figure>
            </motion.div>

            {/* MIDDLE: glowing divider */}
            <div className="sp-divider" aria-hidden="true">
              <div className="sp-pin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    opacity="0.6"
                  />
                  <path
                    d="M12 7v10m0 0l-4-4m4 4l4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* RIGHT: title + bullets */}
            <motion.div
              className="sp-right"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 className="sp-title" variants={fadeUp}>
                Strategic Partnerships
              </motion.h2>

              <ul className="sp-list">
                <motion.li variants={fadeUp}>
                  <span className="sp-bullet" aria-hidden="true">
                    {checkIcon()}
                  </span>
                  <div>
                    <strong>International Architectural Firms</strong>
                    <p>
                      Collaborations with renowned architects to create
                      distinctive and innovative designs.
                    </p>
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <span className="sp-bullet" aria-hidden="true">
                    {checkIcon()}
                  </span>
                  <div>
                    <strong>Sustainable Technology Providers</strong>
                    <p>
                      Partnerships with green technology companies to implement
                      advanced sustainable solutions.
                    </p>
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <span className="sp-bullet" aria-hidden="true">
                    {checkIcon()}
                  </span>
                  <div>
                    <strong>Financial Institutions</strong>
                    <p>
                      Strong relationships with major banks and investment firms
                      to facilitate project financing.
                    </p>
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <span className="sp-bullet" aria-hidden="true">
                    {checkIcon()}
                  </span>
                  <div>
                    <strong>Hospitality Operators</strong>
                    <p>
                      Alliances with premium hotel brands to manage our
                      hospitality assets.
                    </p>
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <span className="sp-bullet" aria-hidden="true">
                    {checkIcon()}
                  </span>
                  <div>
                    <strong>Construction Specialists</strong>
                    <p>
                      Partnerships with top-tier contractors to ensure quality
                      execution.
                    </p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* small inline icon helper (no TS) */
function checkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.5" />
      <path
        d="M8 12.5l2.5 2.5L16 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
