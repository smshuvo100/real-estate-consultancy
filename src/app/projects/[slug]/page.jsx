// ✅ src/app/projects/[slug]/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaCheckCircle,
} from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqSmall from "@/app/components/FaqSmall";
import { motion } from "framer-motion";

// ---- helpers ----
const formatNumber = (v) => {
  if (v == null || v === "") return "";
  const num = Number(String(v).replace(/[^\d.]/g, ""));
  if (Number.isNaN(num)) return String(v);
  return num.toLocaleString();
};

const formatCurrency = (v) => {
  if (!v) return "";
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  if (Number.isNaN(n)) return v;
  return `${n.toLocaleString()} $`;
};

const buildPriceLine = (p) => {
  const type = p?.priceDisplayType || "";
  const start = p?.priceStarting;
  const max = p?.priceMaximum;
  if (type === "On Request") return "Price on request";
  if (type === "Price Range" && (start || max)) {
    return `${formatCurrency(start) || "—"} – ${formatCurrency(max) || "—"}`;
  }
  if (type === "Starting from" && start) {
    return `Starting from ${formatCurrency(start)}`;
  }
  // fallback if nothing selected
  if (start && max) return `${formatCurrency(start)} – ${formatCurrency(max)}`;
  if (start) return `Starting from ${formatCurrency(start)}`;
  return "";
};

const commaJoin = (arr) =>
  Array.isArray(arr) && arr.length ? arr.join(", ") : "N/A";

const embedHTML = (value) => {
  if (!value) return null;
  const v = String(value).trim();
  // If full iframe provided, use as-is
  if (v.startsWith("<iframe")) return v;
  // Otherwise assume it's a URL we can iframe
  return `<iframe src="${v}" width="100%" height="480" style="border:0" allowfullscreen loading="lazy"></iframe>`;
};

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

  const priceLine = useMemo(() => buildPriceLine(project || {}), [project]);

  if (!project) return <p style={{ padding: 40 }}>Loading...</p>;

  // Slider settings (hero gallery)
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
        settings: { centerMode: true, slidesToShow: 1, centerPadding: "50px" },
      },
      {
        breakpoint: 768,
        settings: { centerMode: true, slidesToShow: 1, centerPadding: "50px" },
      },
    ],
  };

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        className="hero single-hero"
        style={{ backgroundImage: `url("/images/hero.webp")` }}
      >
        <div
          className="overlay"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
        <div className="container">
          <motion.div
            className="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-1">{project.propertyArea || project.title}</h2>
            {priceLine && <p className="subtitle">{priceLine}</p>}
          </motion.div>
        </div>
      </section>

      {/* ===== About ===== */}
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
                />
              </motion.div>
              <div className="img-box" />
            </div>
          </div>
        </div>

        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box" />
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

      {/* ===== Key Facts ===== */}
      <section className="property-details-price">
        <div className="container">
          {priceLine && <h2 className="title-4">{priceLine}</h2>}
          <ul className="property-meta">
            <li>
              <span>
                <LuRuler />
              </span>{" "}
              {project.sqftStarting || project.sqftMaximum
                ? `${formatNumber(project.sqftStarting)} – ${formatNumber(
                    project.sqftMaximum
                  )} sq ft`
                : "Size: N/A"}
            </li>
            <li>
              <span>
                <FaBuilding />
              </span>{" "}
              {project.propertyType || "Property Type: N/A"}
            </li>
            <li>
              <span>
                <FaMapMarkerAlt />
              </span>{" "}
              {project.propertyArea || "Area: N/A"}
            </li>
            <li>
              <span>
                <FaCalendarAlt />
              </span>{" "}
              {project.projectStatus || "Status: N/A"}
            </li>
            <li>
              <span>
                <FaRegClock />
              </span>{" "}
              {project.expectedCompletion || "Expected Completion: N/A"}
            </li>
          </ul>

          {/* Bed/Bath configs */}
          <div className="tag-row" style={{ marginTop: 12 }}>
            <strong>Bedrooms:</strong> {commaJoin(project.bedroomConfig)}
            {"  ·  "}
            <strong>Bathrooms:</strong> {commaJoin(project.bathroomConfig)}
          </div>
        </div>
      </section>

      {/* ===== Videos (Promotional / Virtual Tour / Drone) ===== */}
      {(project.promotionalVideo ||
        project.virtualTourVideo ||
        project.droneFootage) && (
        <section className="container" style={{ marginTop: 24 }}>
          <h2 className="title-4">Project Videos</h2>
          <div className="grid-3" style={{ gap: 24 }}>
            {project.promotionalVideo && (
              <div
                className="video-embed"
                dangerouslySetInnerHTML={{
                  __html: embedHTML(project.promotionalVideo),
                }}
              />
            )}
            {project.virtualTourVideo && (
              <div
                className="video-embed"
                dangerouslySetInnerHTML={{
                  __html: embedHTML(project.virtualTourVideo),
                }}
              />
            )}
            {project.droneFootage && (
              <div
                className="video-embed"
                dangerouslySetInnerHTML={{
                  __html: embedHTML(project.droneFootage),
                }}
              />
            )}
          </div>
        </section>
      )}

      {/* ===== Amenities (populated) ===== */}
      <section className="property-features">
        <div className="container">
          <h2 className="title-4">Amenities</h2>
          {Array.isArray(project.amenities) && project.amenities.length > 0 ? (
            <ul className="property-features-list">
              {project.amenities.map((am) => (
                <li key={am.name}>
                  <span className="icon">
                    {am.image ? (
                      <Image
                        src={am.image}
                        width={28}
                        height={28}
                        alt={am.name}
                      />
                    ) : (
                      <FaCheckCircle />
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

      {/* ===== Payment & Legal ===== */}
      {(project.paymentPlanType ||
        project.paymentPlanDetails ||
        project.titleDeedType ||
        project.ownershipEligibility ||
        project.reraRegistrationNumber ||
        project.nocStatus ||
        typeof project.escrowAccount === "boolean") && (
        <section className="container">
          <h2 className="title-4">Payment & Legal</h2>
          <div className="grid-3">
            <div>
              <p>
                <strong>Payment Plan:</strong>{" "}
                {project.paymentPlanType || "N/A"}
              </p>
              <p>
                <strong>Down Payment %:</strong>{" "}
                {project.downPaymentPercentage || "N/A"}
              </p>
              <p>
                <strong>Service Charge / sq ft:</strong>{" "}
                {project.serviceChargePerSqFt || "N/A"}
              </p>
              <p>
                <strong>Booking Amount:</strong>{" "}
                {project.bookingAmount || "N/A"}
              </p>
              <p>
                <strong>Registration Fee:</strong>{" "}
                {project.registrationFee || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Title Deed:</strong> {project.titleDeedType || "N/A"}
              </p>
              <p>
                <strong>Ownership:</strong>{" "}
                {project.ownershipEligibility || "N/A"}
              </p>
              <p>
                <strong>RERA #:</strong>{" "}
                {project.reraRegistrationNumber || "N/A"}
              </p>
              <p>
                <strong>NOC Status:</strong> {project.nocStatus || "N/A"}
              </p>
              <p>
                <strong>Escrow Account:</strong>{" "}
                {project.escrowAccount ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p>
                <strong>Plan Details:</strong>
              </p>
              <div
                className="muted"
                style={{ whiteSpace: "pre-wrap", opacity: 0.9 }}
              >
                {project.paymentPlanDetails || "—"}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Investment Info ===== */}
      {(project.expectedROI ||
        project.rentalYield ||
        project.capitalAppreciation ||
        typeof project.mortgageAvailable === "boolean" ||
        project.bankFinancingPercentage ||
        (Array.isArray(project.suitableFor) && project.suitableFor.length) ||
        (Array.isArray(project.targetAudience) &&
          project.targetAudience.length)) && (
        <section className="container">
          <h2 className="title-4">Investment Information</h2>
          <div className="grid-3">
            <div>
              <p>
                <strong>Expected ROI:</strong> {project.expectedROI || "N/A"}
              </p>
              <p>
                <strong>Rental Yield:</strong> {project.rentalYield || "N/A"}
              </p>
              <p>
                <strong>Capital Appreciation:</strong>{" "}
                {project.capitalAppreciation || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Mortgage Available:</strong>{" "}
                {project.mortgageAvailable ? "Yes" : "No"}
              </p>
              <p>
                <strong>Bank Financing %:</strong>{" "}
                {project.bankFinancingPercentage || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Suitable For:</strong> {commaJoin(project.suitableFor)}
              </p>
              <p>
                <strong>Target Audience:</strong>{" "}
                {commaJoin(project.targetAudience)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===== Neighborhood ===== */}
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

      {/* ===== Main Gallery ===== */}
      <div className="slick-gallery project-single-slider">
        <Slider {...sliderSettings}>
          {(project.gallery?.length
            ? project.gallery
            : ["/images/property-fallback.webp"]
          ).map((src, idx) => (
            <div key={idx} className="slide">
              <Image src={src} alt={`Slide ${idx}`} width={1000} height={600} />
            </div>
          ))}
        </Slider>
      </div>

      {/* ===== Additional Media (simple grids) ===== */}
      {[
        ["Master Plan", project.masterPlanImages],
        ["Elevation Views", project.elevationViews],
        ["Interior Design", project.interiorDesignImages],
        ["Amenities Images", project.amenitiesImages],
        ["Location Map", project.locationMapImages],
        ["Progress Photos", project.progressPhotos],
        ["Virtual Tour Images", project.virtualTourImages],
      ].map(([title, arr]) =>
        Array.isArray(arr) && arr.length ? (
          <section key={title} className="container" style={{ marginTop: 24 }}>
            <h2 className="title-4">{title}</h2>
            <div
              className="image-grid"
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              }}
            >
              {arr.map((src, i) => (
                <div
                  key={i}
                  className="grid-cell"
                  style={{ position: "relative", aspectRatio: "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {/* ===== Floorplans ===== */}
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

      {/* ===== Floorplan Image ===== */}
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
