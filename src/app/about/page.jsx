import React from "react";
import { Hero } from "../components/Hero";
import { OurTeam } from "../components/OurTeam";
import { TeamIntro } from "../components/TeamIntro";
import { Fullimage } from "../components/Fullimage";
import { About } from "../components/About";

export default function page() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero2.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "who we are",
    subtitle: "about us",
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

  // About Data

  const aboutData = {
    tabs: [
      {
        label: "Company Profile",
        content: [
          "SFK Real Estate Consultancy stands as a distinguished leader in the UAE's real estate development landscape, transforming ambitious visions into landmark realities. With a foundation built on excellence, innovation, integrity, and sustainability, we specialize in acquiring strategic land parcels and developing them into vibrant, master-planned communities that redefine urban living. ",
          "Our comprehensive approach encompasses the entire development lifecycle—from initial concept and design through to construction and handover—ensuring timely delivery and the highest quality standards. At SFK, we integrate cutting-edge green technologies and sustainable practices to create ecofriendly environments that promote a higher quality of life while reducing environmental impact.",
          "With an impressive portfolio spanning luxury residential developments, commercial properties, hospitality ventures, mixed-use projects, and diversified business interests across the UAE, Oman, and Lebanon, SFK Real Estate Consultancy continues to shape skylines and communities, building tomorrow, today.",
        ],
        stats: [
          { value: "200+", label: "Happy Customers" },
          { value: "10k+", label: "Properties For Clients" },
          { value: "16+", label: "Years of Experience" },
        ],
      },
      {
        label: "Vision",
        content: [
          "To be at the forefront of the real estate industry, crafting iconic, sustainable developments that elevate the standards of living and working environments in the UAE and beyond.",
        ],
        stats: [
          { value: "200+", label: "Happy Customers" },
          { value: "10k+", label: "Properties For Clients" },
          { value: "16+", label: "Years of Experience" },
        ],
      },
      {
        label: "Mission",
        content: [
          "To consistently deliver innovative, sustainable, and high-quality real estate solutions that meet the evolving needs of our clients and contribute to the economic and social prosperity of the region.",
        ],
        stats: [
          { value: "200+", label: "Happy Customers" },
          { value: "10k+", label: "Properties For Clients" },
          { value: "16+", label: "Years of Experience" },
        ],
      },
    ],
    images: [
      { src: "/images/about-1.webp", alt: "about", width: 570, height: 944 },
      { src: "/images/about-2.webp", alt: "about", width: 706, height: 1014 },
    ],
  };

  return (
    <>
      {/* hero section */}
      <Hero data={heroData} />

      {/* about us */}
      <About data={aboutData} />

      {/*  team intro */}
      <TeamIntro />

      {/* our team */}
      <OurTeam />

      {/* full image section  */}
      <Fullimage />
    </>
  );
}
