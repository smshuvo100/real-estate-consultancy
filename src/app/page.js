import Image from "next/image";
import { RecentProjects } from "./components/RecentProjects";
import { Hero } from "./components/Hero";
import { OurServices } from "./components/OurServices";
import { Gallery } from "./components/Gallery";
import { Fullimage } from "./components/Fullimage";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { SlickGallery } from "./components/SlickGallery";
import { ContactTabs } from "./components/ContactTabs";
import { FaqTabs } from "./components/FaqTabs";
import { LatestBlogs } from "./components/LatestBlogs";
import { TeamIntro } from "./components/TeamIntro";
import { OurTeam } from "./components/OurTeam";
import { PropertyGrid } from "./components/PropertyGrid";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <Hero />
      {/* Recent-Projects section */}
      <RecentProjects />

      {/* our services  */}
      <OurServices />

      {/* gallery section */}
      <Gallery />

      {/* full image section  */}
      <Fullimage />

      {/* about section */}
      <About />

      {/* contact section */}
      <Contact />

      <SlickGallery />
      <ContactTabs />
      <FaqTabs />
      <LatestBlogs />
      <TeamIntro />
      <OurTeam />
      <PropertyGrid />
      {/* FAQ Tabs FaqTabs */}

      {/* footer section */}
    </>
  );
}
