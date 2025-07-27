"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function OurServices() {
  return (
    <>
      <section className="our-services">
        <div className="container">
          <motion.h2
            className="title-4 uppercase center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            our services
          </motion.h2>

          <div className="grid">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                className="box"
                initial={{ opacity: 0, y: 150, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.5 + i * 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="icon">
                  <Image
                    src="/icons/arrow.svg"
                    width={34}
                    height={34}
                    alt="icon"
                  />
                </div>
                <div className="s-ion center">
                  <Image
                    src="/icons/icon-s1.svg"
                    width={82}
                    height={82}
                    alt="icon"
                  />
                </div>
                <h2 className="title-5">Land Acquisition & Development</h2>
                <p>
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled living and working spaces. Our expertise in land
                  evaluation, market analysis, and development potential
                  assessment ensures maximum value creation for every project we
                  undertake.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
