// ✅ src/app/projects/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import { FaBath, FaBuilding, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqSmall from "@/app/components/FaqSmall";
import { motion } from "framer-motion";

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

  // Slider settings
  const sliderSettings = {
    centerMode: true,
    centerPadding: "400px",
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
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
          <motion.div
            className="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-1">{project.propertyArea}</h2>
          </motion.div>
        </div>
      </section>

      <section className="about container-full-width">
        <div className="top-position">
          <div className="container">
            <div className="flex-box">
              <motion.div
                className="text-box"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="title-4">{project.title}</h2>
                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
              </motion.div>
              <div className="img-box"></div>
            </div>
          </div>
        </div>

        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box"></div>
              <motion.div
                className="img-box sm"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
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
              </motion.div>
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

      {/* ✅ New Amenities block (using populated project.amenities) */}
      <section className="property-features">
        <div className="container">
          <h2 className="title-4">Amenities</h2>

          {Array.isArray(project.amenities) && project.amenities.length > 0 ? (
            <ul className="property-features-list">
              {project.amenities.map((am) => (
                <li key={am._id || am.id || am.name}>
                  <span className="icon">
                    {am.image ? (
                      <Image
                        src={am.image}
                        width={28}
                        height={28}
                        alt={am.name}
                      />
                    ) : (
                      <FiCheckCircle />
                    )}
                  </span>
                  <span className="tect">{am.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ opacity: 0.8 }}>No amenities listed.</p>
          )}
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

      <section className="full-image11">
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
