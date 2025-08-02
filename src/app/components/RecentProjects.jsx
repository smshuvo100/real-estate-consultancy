"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        const featured = (data.projects || []).filter((p) => p.isFeatured);
        setProjects(featured);
      } catch (error) {
        console.error("❌ Failed to fetch recent projects:", error);
      }
    };

    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
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
          backgroundImage: `url(${
            projects[activeIndex]?.featuredImages?.[0] || ""
          })`,
          transition: "background-image 0.6s ease-in-out",
        }}
      >
        <div className="container sm">
          <div className="overlay">
            <ul className="project-titles">
              {projects.map((item, i) => (
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
                  <Link href={`/projects/${item.slug}`}>{item.title}</Link>
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
  );
}
