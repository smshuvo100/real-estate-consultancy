"use client";
import { useState } from "react";

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
          <h2 className="title-4 uppercase center">recent projects</h2>
        </div>
        <div
          className="recent-projects"
          style={{ backgroundImage: `url(${titles[activeIndex].image})` }}
        >
          <div className="container sm">
            <div className="overlay">
              <ul className="project-titles">
                {titles.map((item, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`big-text ${activeIndex === i ? "active" : ""}`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
