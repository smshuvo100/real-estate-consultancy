"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Fullimage() {
  return (
    <>
      <section className="full-image">
        <motion.div
          initial={{ opacity: 0, y: 150, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/full-image.webp"
            alt="full image"
            width={1920}
            height={1080}
          />
        </motion.div>
      </section>
    </>
  );
}
