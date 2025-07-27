// ✅ src/app/projects/page.jsx
import React from "react";
import { Hero } from "../components/Hero";
import { PropertyGrid } from "../components/PropertyGrid";

export default function page() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero3.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "Lets have a look at our",
    subtitle: "Projects",
    description: {
      title: "Buy Luxury Apartments for Sale in Dubai, UAE",
      text: "Discover our well-crafted apartments for sale in Dubai, opening the door to a world of sophistication that surpasses all expectations.",
    },
  };
  return (
    <>
      {/* hero section */}
      <Hero data={heroData} />

      {/* property grid */}
      <PropertyGrid />
    </>
  );
}
