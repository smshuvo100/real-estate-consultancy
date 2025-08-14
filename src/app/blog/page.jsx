// ✅ src/app/blog/page.jsx
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
        text: "We are committed to delivering the highest quality in every project, exceeding expectations and setting new standards in the industry.",
      },
      {
        title: "Innovation",
        text: "We embrace creativity and advanced technologies to stay ahead of market trends, constantly seeking new solutions to complex challenges.",
      },
      {
        title: "Integrity",
        text: "We uphold transparency and ethical practices in all business operations, building trust with clients, partners, and communities.",
      },
      {
        title: "Sustainability",
        text: "We ensure our developments contribute positively to the environment and community, creating lasting value for generations to come.",
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
