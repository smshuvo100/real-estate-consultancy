"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function OurTeam() {
  return (
    <section className="our-team">
      <div className="container">
        <h2 className="title-4 center">Our Team</h2>
        <div className="team-grid">
          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="team-img">
              <Image
                src="/images/team1.webp"
                alt="Hardly Jackson"
                width={500}
                height={689}
              />
            </div>
            <h3 className="title-5">Hardly Jackson</h3>
            <p className="team-role">CEO</p>
            <p className="team-desc">
              We identify and acquire strategic land parcels, transforming them
              into vibrant, master-planned communities that offer unparalleled
              living and working spaces.
            </p>
          </motion.div>

          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="team-img">
              <Image
                src="/images/team1.webp"
                alt="Hardly Jackson"
                width={500}
                height={689}
              />
            </div>
            <h3 className="title-5">Hardly Jackson</h3>
            <p className="team-role">CEO</p>
            <p className="team-desc">
              We identify and acquire strategic land parcels, transforming them
              into vibrant, master-planned communities that offer unparalleled
              living and working spaces.
            </p>
          </motion.div>

          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="team-img">
              <Image
                src="/images/team1.webp"
                alt="Hardly Jackson"
                width={500}
                height={689}
              />
            </div>
            <h3 className="title-5">Hardly Jackson</h3>
            <p className="team-role">CEO</p>
            <p className="team-desc">
              We identify and acquire strategic land parcels, transforming them
              into vibrant, master-planned communities that offer unparalleled
              living and working spaces.
            </p>
          </motion.div>

          {/* ✅ Repeat as needed with increasing delay: 0.3, 0.4, 0.5 etc. */}
        </div>
      </div>
    </section>
  );
}
