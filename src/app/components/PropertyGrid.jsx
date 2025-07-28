"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBath,
  FaFilter,
  FaTimes,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ranges = {
  "$100k - $150k": [100000, 150000],
  "$150k - $200k": [150001, 200000],
  "$200k - $250k": [200001, 250000],
};

function NextArrow({ onClick }) {
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
}
function PrevArrow({ onClick }) {
  return (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
}

export function PropertyGrid() {
  const [allProperties, setAllProperties] = useState([]);
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const sidebarRef = useRef(null);
  const topRef = useRef(null);
  const limit = 6;

  useEffect(() => {
    setLoadingPage(true);
    fetch(`/api/project?page=${page + 1}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProperties(data.projects || []);
        setTotalPages(Math.ceil(data.total / limit));
        if (shouldScroll && topRef.current) {
          setTimeout(() => {
            topRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
        setShouldScroll(false);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch projects", err);
        setLoadingPage(false);
      });
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".filter-sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const filtered = allProperties.filter((p) => {
    const areaMatch = area ? p.propertyArea === area : true;
    const typeMatch = type ? p.propertyType === type : true;
    const priceNum = parseInt(p.price || "0");
    const rangeMatch = range
      ? priceNum >= ranges[range][0] && priceNum <= ranges[range][1]
      : true;
    const categoryMatch =
      category === "All"
        ? true
        : category.includes("Bed Room")
        ? parseInt(p.bedrooms) === parseInt(category.split(" ")[0])
        : category === p.propertyType;
    return areaMatch && typeMatch && rangeMatch && categoryMatch;
  });

  const handleReset = () => {
    setArea("");
    setType("");
    setRange("");
    setCategory("All");
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected);
    setShouldScroll(true);
  };

  const uniqueAreas = Array.from(
    new Set(allProperties.map((p) => p.propertyArea))
  ).filter(Boolean);
  const uniqueTypes = Array.from(
    new Set(allProperties.map((p) => p.propertyType))
  ).filter(Boolean);
  const uniqueBedrooms = Array.from(
    new Set(allProperties.map((p) => parseInt(p.bedrooms)))
  )
    .filter(Boolean)
    .sort((a, b) => a - b);

  return (
    <>
      <div ref={topRef}></div>
      <section className="property-grid-section">
        <div className="container">
          <motion.h2
            className="title-4 center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Discover Properties
          </motion.h2>
          <div className="property-filter-wrap">
            <div className="top-filter">
              <div className="filter-group">
                <label>Property Area</label>
                <select value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Choose Area</option>
                  {uniqueAreas.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="line"></div>

              <div className="filter-group">
                <label>Property Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Choose Type</option>
                  {uniqueTypes.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="line"></div>

              <div className="filter-group">
                <label>Price Range</label>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                >
                  <option value="">Choose Price Range</option>
                  {Object.keys(ranges).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <button className="search-btn" onClick={handleReset}>
                Reset
              </button>
            </div>

            <div className="carfilter-wrap">
              <div className="category-filter">
                <button
                  className={category === "All" ? "active" : ""}
                  onClick={() => setCategory("All")}
                >
                  All
                </button>
                {uniqueTypes.map((t) => (
                  <button
                    key={t}
                    className={category === t ? "active" : ""}
                    onClick={() => setCategory(t)}
                  >
                    {t}
                  </button>
                ))}
                {uniqueBedrooms.map((num) => (
                  <button
                    key={num}
                    className={category === `${num} Bed Room` ? "active" : ""}
                    onClick={() => setCategory(`${num} Bed Room`)}
                  >
                    {num} Bed Room
                  </button>
                ))}
              </div>

              <div className="btn">
                <button
                  className="filter-sidebar-toggle"
                  onClick={() => setSidebarOpen(true)}
                >
                  <FaFilter /> Filters
                </button>
              </div>
            </div>

            <div
              ref={sidebarRef}
              className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}
            >
              <div className="sidebar-header">
                <h4>Filters</h4>
                <button
                  className="close-btn"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="sidebar-body">
                <select value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Property Area</option>
                  {uniqueAreas.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Property Type</option>
                  {uniqueTypes.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                >
                  <option value="">Price Range</option>
                  {Object.keys(ranges).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="property-grid">
            {filtered.map((property, index) => (
              <motion.div
                className="property-card"
                key={property._id || index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <div className="image-wrapper">
                  <Slider {...sliderSettings}>
                    {(property.gallery?.length
                      ? property.gallery
                      : ["/images/property-fallback.webp"]
                    ).map((src, i) => (
                      <div key={i}>
                        <Image
                          src={src}
                          alt={`Gallery Image ${i + 1}`}
                          width={600}
                          height={400}
                          layout="responsive"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="property-info">
                  <h4>{parseInt(property.price || 0).toLocaleString()} $</h4>
                  <Link
                    className="details-btn"
                    href={`/projects/${property.slug}`}
                  >
                    View Details
                  </Link>
                </div>
                <ul className="property-meta">
                  <li>
                    <span>
                      <FaHome />
                    </span>{" "}
                    {property.bedrooms || "N/A"}
                  </li>
                  <li>
                    <span>
                      <FaBath />
                    </span>{" "}
                    {property.bathrooms || "N/A"}
                  </li>
                  <li>
                    <span>
                      <LuRuler />
                    </span>{" "}
                    {property.sqft || "N/A"}
                  </li>
                  <li>
                    <span>
                      <FaMapMarkerAlt />
                    </span>{" "}
                    {property.propertyArea || "N/A"}
                  </li>
                  <li>
                    <span>
                      <FaBuilding />
                    </span>{" "}
                    {property.propertyType || "N/A"}
                  </li>
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pagination"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {loadingPage && <div className="page-loader">Loading...</div>}
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              breakClassName="page-item"
              breakLinkClassName="page-link"
              disabledClassName="disabled"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
