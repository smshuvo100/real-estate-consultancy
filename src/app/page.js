import Image from "next/image";
import { RecentProjects } from "./components/RecentProjects";
import { Hero } from "./components/Hero";
import { OurServices } from "./components/OurServices";
import { OurServices1 } from "./components/OurServices1";
//import { Gallery } from "./components/Gallery";
import { Fullimage } from "./components/Fullimage";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
//import { SlickGallery } from "./components/SlickGallery";

export default function Home() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "Building Tomorrow",
    subtitle: "Today",
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

  // About Data
  const aboutData = {
    heading: "About Us",
    description:
      "SFK Real Estate Consultancy stands as a distinguished leader in the UAE's real estate development landscape, transforming ambitious visions into landmark realities. With a foundation built on excellence, innovation, integrity, and sustainability, we specialize in acquiring strategic land parcels and developing them into vibrant, master-planned communities that redefine urban living.",
    readMoreLink: "#",
    stats: [
      { value: "200+", label: "Happy Customers" },
      { value: "10k+", label: "Properties For Clients" },
      { value: "16+", label: "Years of Experience" },
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

      {/* Recent-Projects section */}
      <RecentProjects />

      {/* our services ==== */}
      <OurServices />
      <OurServices1 />

      {/* full image section == */}
      <Fullimage />

      {/* about section */}
      <About data={aboutData} />

      {/* contact section */}
      <Contact />

      {/* <SlickGallery /> */}
    </>
  );
}
