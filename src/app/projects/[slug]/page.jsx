// ✅ src/app/projects/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import {
  FaArrowAltCircleUp,
  FaBath,
  FaBuilding,
  FaDoorOpen,
  FaFire,
  FaHome,
  FaMapMarkerAlt,
  FaWindowMaximize,
} from "react-icons/fa";
import { GiFlowerPot, GiWashingMachine } from "react-icons/gi";
import { LuRuler } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqSmall from "@/app/components/FaqSmall";

export default function SingleProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/project?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => setProject(data.project || null))
        .catch((err) => console.error("❌ Failed to fetch project", err));
    }
  }, [slug]);

  if (!project) return <p style={{ padding: 40 }}>Loading...</p>;

  const sliderSettings = {
    centerMode: true,
    centerPadding: "400px",
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { centerPadding: "40px" } },
      { breakpoint: 480, settings: { centerPadding: "20px" } },
    ],
  };

  return (
    <>
      <section
        className="hero single-hero"
        style={{ backgroundImage: `url("/images/hero.webp")` }}
      >
        <div
          className="overlay"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="container">
          <div className="center">
            <h2 className="title-1">{project.propertyArea}</h2>
          </div>
        </div>
      </section>

      <section className="about container-full-width">
        <div className="top-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box">
                <h2 className="title-4">{project.title}</h2>
                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
              </div>
              <div className="img-box"></div>
            </div>
          </div>
        </div>

        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box"></div>
              <div className="img-box sm">
                <div className="img-position">
                  <div className="img1">
                    <Image
                      src={project.sidebarImages?.[0] || "/images/about-1.webp"}
                      alt="Sidebar 1"
                      width={570}
                      height={944}
                    />
                  </div>
                  <div className="img2">
                    <Image
                      src={project.sidebarImages?.[1] || "/images/about-2.webp"}
                      alt="Sidebar 2"
                      width={706}
                      height={1014}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="property-details-price">
        <div className="container">
          <h2 className="title-4">
            {parseInt(project.price || 0).toLocaleString()} $
          </h2>
          <ul className="property-meta">
            <li>
              <span>
                <LuRuler />
              </span>{" "}
              {project.sqft || "N/A"}
            </li>
            <li>
              <span>
                <FaHome />
              </span>{" "}
              {project.bedrooms || "N/A"}
            </li>
            <li>
              <span>
                <FaBath />
              </span>{" "}
              {project.bathrooms || "N/A"}
            </li>
            <li>
              <span>
                <FaMapMarkerAlt />
              </span>{" "}
              {project.propertyArea || "N/A"}
            </li>
            <li>
              <span>
                <FaBuilding />
              </span>{" "}
              {project.propertyType || "N/A"}
            </li>
          </ul>
        </div>
      </section>

      <section className="property-features">
        <div className="container">
          <h2 className="title-4">Features</h2>
          <ul className="property-features-list">
            {project.elevator && (
              <li>
                <span className="icon">
                  <FaArrowAltCircleUp />
                </span>
                <span className="tect">Elevator</span>
              </li>
            )}
            {project.laundryFacility && (
              <li>
                <span className="icon">
                  <GiWashingMachine />
                </span>
                <span className="tect">Laundry Facilities</span>
              </li>
            )}
            {project.walkInCloset && (
              <li>
                <span className="icon">
                  <FaDoorOpen />
                </span>
                <span className="tect">Walk In Closet</span>
              </li>
            )}
            {project.firePlace && (
              <li>
                <span className="icon">
                  <FaFire />
                </span>
                <span className="tect">Fire Place</span>
              </li>
            )}
            {project.balcony && (
              <li>
                <span className="icon">
                  <FaWindowMaximize />
                </span>
                <span className="tect">Balcony</span>
              </li>
            )}
            {project.garage && (
              <li>
                <span className="icon">
                  <GiFlowerPot />
                </span>
                <span className="tect">Garage</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="property-neighborhood">
        <div className="container">
          <h2 className="title-4">Neighborhood</h2>
          <p className="subtitle">{project.address}</p>
          <div className="map-iframe">
            <iframe
              src={project.mapIframe}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <div className="slick-gallery project-single-slider">
        <Slider {...sliderSettings}>
          {(project.gallery?.length
            ? project.gallery
            : ["/images/property-fallback.webp"]
          ).map((src, idx) => (
            <div key={idx} className="slide">
              <Image
                src={src}
                alt={`Slide ${idx}`}
                width={1000}
                height={600}
                layout="responsive"
              />
            </div>
          ))}
        </Slider>
      </div>

      <section className="floorplans">
        <div className="container">
          <h2 className="title-4 center uppercase">floorplans</h2>
          <div className="grid">
            <div className="grid-item">
              <h2 className="title-5">UNIT :</h2>
              <p>{project.unit || "N/A"}</p>
            </div>
            <div className="grid-item">
              <h2 className="title-5">SUITE :</h2>
              <p>{project.suite || "N/A"}</p>
            </div>
            <div className="grid-item">
              <h2 className="title-5">BALCONY :</h2>
              <p>{project.balconySize || "N/A"}</p>
            </div>
            <div className="grid-item">
              <h2 className="title-5">TOTAL :</h2>
              <p>{project.total || "N/A"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="full-image">
        <Image
          src={project.image || "/images/full-image.webp"}
          alt="floorplan"
          width={1920}
          height={1080}
        />
      </section>

      <FaqSmall />
    </>
  );
}
