// ✅ /src/app/about/page.jsx
import { headers } from "next/headers";
import { Hero } from "../components/Hero";
import { OurTeam } from "../components/OurTeam";
import { TeamIntro } from "../components/TeamIntro";
import { Fullimage } from "../components/Fullimage";
import { About } from "../components/About";
import { BusinessDiversificationLeft } from "../components/BusinessDiversificationLeft";
import { BusinessDiversificationRight } from "../components/BusinessDiversificationRight";
import { OurApproach } from "../components/OurApproach";

import Image from "next/image";
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
      <div className="about-hero">
        <Hero data={heroData} />
      </div>

      <About data={aboutData} />

      <TeamIntro />
      <OurTeam />
      {/* <div className="margin-bottom">
        <BusinessDiversificationLeft
          title="Logistics Services"
          text={`<p>
                Through Al Mamlaka Logistics Services, we provide comprehensive
                logistics solutions including warehousing, distribution,
                temperature controlled storage, and supply chain management. Our
                logistics facilities are strategically located near major ports
                and airports, offering clients efficient access to regional and
                international markets.
              </p>`}
          image="full-image.webp"
        />
        <BusinessDiversificationRight
          title="Service Highlights:"
          text={`
        <ul>
          <li>Dry and temperature-controlled warehousing</li>
          <li>Distribution and transportation services</li>
          <li>Supply chain management solutions</li>
          <li>Import/export logistics support.</li>
          <li>Specialized handling for various product categories</li>
        </ul>
      `}
          image="full-image.webp"
        />

        <BusinessDiversificationLeft
          title="Exhibition Organization"
          text={`<p>
               Al Mamlaka Organizing Exhibitions specializes in planning and executing professional exhibitions, trade shows, and corporate events. With operations in both Oman and Kuwait (through Expo City), this division helps businesses showcase their products and services to targeted audiences.
              </p>`}
          image="full-image.webp"
        />

        <BusinessDiversificationRight
          title="Service Highlights:"
          text={`
        <ul>
          <li>Trade show organization and management</li>
          <li>Corporate event planning</li>
          <li>Exhibition space design and setup</li>
          <li>Marketing and promotional support</li>
          <li>Visitor management and engagement</li>
        </ul>
      `}
          image="full-image.webp"
        />

        <BusinessDiversificationLeft
          title="Luxury Consumer Products"
          text={`<p>
               Expanding beyond real estate and services, we have successfully launched Al Mamlaka Perfumes, a premium fragrance line that embodies luxury and sophistication. This venture demonstrates our ability t o extend our brand into high-end consumer markets.
              </p>`}
          image="full-image.webp"
        />

        <BusinessDiversificationRight
          title="Service Highlights:"
          text={`
        <ul>
          <li>Premium fragrance formulations</li>
          <li>Luxury packaging and presentation</li>
          <li>Distinctive brand identity</li>
          <li>Exclusive distribution channels</li>
          <li>Growing market presenc</li>
        </ul>
      `}
          image="full-image.webp"
        />
      </div> */}
      <section className="full-image-7">
        <div className="container">
          <h2 class="title-4 center">REGIONAL PRESENCE</h2>
          <Image
            src="/images/map-about.webp"
            alt="region"
            width={1920}
            height={1080}
          />
        </div>
      </section>
      {/* OurApproach.jsx */}
      {/* <OurApproach /> */}
      <Fullimage />
    </>
  );
}
