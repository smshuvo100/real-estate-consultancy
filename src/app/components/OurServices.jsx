// src/app/components/OurServices.jsx
"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function OurServices() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="our-services">
      <div className="container">
        <div className="flex-box">
          <div className="sm-coll sm1">
            {/* 1) Real Estate Development */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Real Estate Development</h2>
              <ul>
                <li>
                  <div>SFK Real Estate Consultancy</div>
                  <p>Flagship development company headquartered in UAE</p>
                </li>
                <li>
                  <div>Al Mamlaka Real Estate Development</div>
                  <p>
                    Strategic development partner with operations in Oman and
                    UAE
                  </p>
                </li>
              </ul>
            </motion.div>

            {/* 2) Consumer Products */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Consumer Products</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Perfumes</div>
                  <p>Luxury fragrance line</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="sm-coll sm2">
            {/* 3) Retail & Commercial */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 2.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Retail &amp; Commercial</h2>
              <ul>
                <li>
                  <div>Gold Center and Jewelry Complex</div>
                  <p>Specialized retail development</p>
                </li>
              </ul>
            </motion.div>

            {/* Center rotating logo + text */}
            <div className="round-box-sec">
              <motion.div
                className="img-box"
                style={{ willChange: "transform" }}
                whileInView={{ rotate: reduceMotion ? 0 : 360 }}
                transition={{
                  duration: 24,
                  ease: "linear",
                  repeat: reduceMotion ? 0 : Infinity,
                }}
                viewport={{ once: false, amount: 0.6 }}
              >
                <Image
                  className="divider"
                  src="/images/roundlogo.webp"
                  width={400}
                  height={400}
                  alt="divider"
                  priority
                />
              </motion.div>

              <motion.div
                className="text-box"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <p>
                  SFK Real Estate Consultancy operates as the flagship entity
                  within a diversified group of companies that span multiple
                  sectors:
                </p>
              </motion.div>
            </div>

            {/* 4) Hospitality & Tourism */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 2.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Hospitality &amp; Tourism</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Hospitality</div>
                  <p>Hotel and restaurant development and management.</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="sm-coll sm3">
            {/* 5) Exhibition & Marketing */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 3.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Exhibition &amp; Marketing</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Organizing Exhibitions</div>
                  <p>Event management and exhibition services</p>
                </li>
                <li>
                  <div>Al Mamlaka Advertising</div>
                  <p>Marketing and promotional services</p>
                </li>
              </ul>
            </motion.div>

            {/* 6) Logistics & Support Services */}
            <motion.div
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Logistics &amp; Support Services</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Logistics Services</div>
                  <p>
                    Comprehensive logistics solutions and supply chain
                    management
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
