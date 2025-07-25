import React from "react";
import { Hero } from "../components/Hero";
import { LatestBlogs } from "../components/LatestBlogs";

export default function page() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero4.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "Read our latest",
    subtitle: "blogs",
    features: [
      {
        title: "Excellence",
        text: "We are committed to delivering the highest quality in every project, exceeding expectations.",
      },
      {
        title: "Innovation",
        text: "We embrace the latest technologies and trends to stay ahead in the construction world.",
      },
      {
        title: "Integrity",
        text: "Honesty and transparency are at the core of everything we do.",
      },
      {
        title: "Sustainability",
        text: "Eco-friendly practices guide our every project.",
      },
    ],
  };
  return (
    <>
      {/* hero section */}
      <Hero data={heroData} />

      {/* blog section */}
      <LatestBlogs />
    </>
  );
}
