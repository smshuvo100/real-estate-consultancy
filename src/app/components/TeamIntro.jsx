"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function TeamIntro() {
  const [founder, setFounder] = useState(null);

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const res = await fetch("/api/founder", { cache: "no-store" });
        const data = await res.json();
        setFounder(data);
      } catch (err) {
        console.error("❌ Failed to fetch founder data:", err);
      }
    };
    fetchFounder();
  }, []);

  if (!founder) return null;

  return (
    <section className="team-intro">
      <div className="container">
        <div className="intro-grid">
          <motion.div
            className="intro-image"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {founder.image && (
              <Image
                src={founder.image}
                alt={founder.name}
                width={1000}
                height={1047}
              />
            )}
          </motion.div>

          <motion.div
            className="intro-content"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-3">{founder.name}</h2>
            <p className="intro-role">{founder.title}</p>
            <div
              className="founder-description"
              dangerouslySetInnerHTML={{ __html: founder.description }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
