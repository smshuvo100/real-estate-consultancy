// ✅ src/app/components/Hero.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function Hero({ data }) {
  if (!data) return null;

  const {
    heroImage,
    overlayColor,
    bottomOverlay,
    title,
    subtitle,
    features,
    description,
  } = data;

  return (
    <section
      className="hero"
      style={heroImage ? { backgroundImage: `url("${heroImage}")` } : {}}
    >
      {overlayColor && (
        <div
          className="overlay"
          style={{ backgroundColor: overlayColor }}
        ></div>
      )}

      <div className="container">
        {(title || subtitle) && (
          <motion.div
            className="center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {title && <h2 className="title-2">{title}</h2>}
            {subtitle && <h2 className="title-1">{subtitle}</h2>}
          </motion.div>
        )}
      </div>

      {(features?.length > 0 || description?.title || description?.text) && (
        <div
          className="hero-bottom"
          style={bottomOverlay ? { backgroundColor: bottomOverlay } : {}}
        >
          <div className="container">
            {features?.length > 0 && (
              <div className="grid">
                {features.map((item, index) => (
                  <motion.div
                    className="box"
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {item.title && <h2 className="title-5">{item.title}</h2>}
                    {item.text && <p>{item.text}</p>}
                  </motion.div>
                ))}
              </div>
            )}

            {(description?.title || description?.text) && (
              <div className="grid2">
                {description?.title && (
                  <motion.div
                    className="box"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <h2 className="title-3">{description.title}</h2>
                  </motion.div>
                )}
                {description?.text && (
                  <motion.div
                    className="box"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <p>{description.text}</p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
