"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const titles = [
  { label: "Deira Island", image: "/images/recent-projects-1.webp" },
  { label: "Al Furjan", image: "/images/recent-projects-2.webp" },
  { label: "Pearl Tower", image: "/images/recent-projects-3.webp" },
  { label: "Business Bay", image: "/images/recent-projects-4.webp" },
];

export function RecentProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <section className="recent-projects-sec">
        <div className="container">
          <motion.h2
            className="title-4 uppercase center"
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            recent projects
          </motion.h2>
        </div>

        <div
          className="recent-projects"
          style={{
            backgroundImage: `url(${titles[activeIndex].image})`,
            transition: "background-image 0.6s ease-in-out",
          }}
        >
          <div className="container sm">
            <div className="overlay">
              <ul className="project-titles">
                {titles.map((item, i) => (
                  <motion.li
                    key={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`big-text ${activeIndex === i ? "active" : ""}`}
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    {item.label}
                  </motion.li>
                ))}
              </ul>
              <div className="btn">
                <Link href="/projects" className="btn-1">
                  view all projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
