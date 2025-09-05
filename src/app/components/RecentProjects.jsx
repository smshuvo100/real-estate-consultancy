"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project", { cache: "no-store" });
        const data = await res.json();

        // 1) Keep featured only
        const featured = Array.isArray(data?.projects)
          ? data.projects.filter((p) => p?.isFeatured)
          : [];

        // 2) Normalize and keep only items that have at least one usable image
        const normalized = featured
          .map((p) => {
            const imgs = Array.isArray(p?.featuredImages)
              ? p.featuredImages
              : [];
            const firstImage = imgs?.[0];

            return {
              title: p?.title ?? "Untitled",
              slug: p?.slug ?? "",
              // ensure it is a string path; allow both absolute and /public paths
              firstImage:
                typeof firstImage === "string" && firstImage.trim()
                  ? firstImage.trim()
                  : "", // we’ll fallback later if empty
            };
          })
          .filter((p) => p.title && (p.firstImage || true)); // keep all; we’ll fallback per-card

        setProjects(normalized);
      } catch (error) {
        console.error("❌ Failed to fetch recent projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Safety: clamp activeIndex to valid range whenever projects change
  useEffect(() => {
    if (activeIndex >= projects.length) setActiveIndex(0);
  }, [projects, activeIndex]);

  // Compute background URL with a safe fallback
  const bgUrl = useMemo(() => {
    const url = projects?.[activeIndex]?.firstImage;
    // If DB image missing, use your own fallback under /public
    return url && typeof url === "string"
      ? url
      : "/images/fallback-project.jpg";
  }, [projects, activeIndex]);

  if (!projects || projects.length === 0) return null;

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

      {/* 🔧 Inline styles so the BG actually shows even without external CSS */}
      <div
        className="recent-projects"
        style={{
          // Important: wrap URL in quotes for safety; also ensure the section has height
          backgroundImage: `url("${encodeURI(bgUrl)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "520px",
          position: "relative",
          // NOTE: background-image itself doesn’t animate; if you want a fade, use a crossfade layer
        }}
      >
        <div className="container sm">
          <div className="overlay" style={{ position: "relative", zIndex: 2 }}>
            <ul className="project-titles">
              {projects.map((item, i) => (
                <motion.li
                  key={`${item.slug || item.title}-${i}`}
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
                  <Link href={`/projects/${item.slug || ""}`}>
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="btn">
              <Link href="/projects" className="btn-1">
                view all projects
              </Link>
            </div>
          </div>

          {/* Optional dark overlay for readability; remove if not needed */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}
