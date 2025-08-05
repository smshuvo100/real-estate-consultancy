// ✅ /src/app/about/page.jsx
import { headers } from "next/headers";
import { Hero } from "../components/Hero";
import { OurTeam } from "../components/OurTeam";
import { TeamIntro } from "../components/TeamIntro";
import { Fullimage } from "../components/Fullimage";
import { About } from "../components/About";

// ✅ fetch from MongoDB
async function getAboutTabs() {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/about-tab`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const aboutTabs = await getAboutTabs();

  const aboutData = {
    tabs: (aboutTabs || []).map((tab) => ({
      label: tab.title,
      content: tab.content || "",
      stats: (tab.counters || []).map((c) => ({
        value: c.num,
        label: c.title,
      })),
    })),
    images: [
      { src: "/images/about-1.webp", alt: "about", width: 570, height: 944 },
      { src: "/images/about-2.webp", alt: "about", width: 706, height: 1014 },
    ],
  };

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

  return (
    <>
      <div className="about-hero">
        <Hero data={heroData} />
      </div>

      <About data={aboutData} />

      <TeamIntro />
      <OurTeam />
      <Fullimage />
    </>
  );
}
