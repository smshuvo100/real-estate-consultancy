import React from "react";
import { Hero } from "../components/Hero";
import { ContactTabs } from "../components/ContactTabs";

export default function page() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "connect with us",
    subtitle: "contact",
  };
  return (
    <>
      {/* hero section */}
      <Hero data={heroData} />

      {/* contact form */}
      <ContactTabs />
    </>
  );
}
