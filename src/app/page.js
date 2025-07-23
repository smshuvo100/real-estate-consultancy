import Image from "next/image";
import { RecentProjects } from "./components/RecentProjects";
import { Hero } from "./components/Hero";
import { OurServices } from "./components/OurServices";
import { Gallery } from "./components/Gallery";
import { Fullimage } from "./components/Fullimage";
import { About } from "./components/About";
import { Contact } from "./components/Contact";

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

      {/* footer section */}
    </>
  );
}
