"use client";

import Image from "next/image";
import Slider from "react-slick";

import { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBath,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const ranges = {
  "$100k - $150k": [100000, 150000],
  "$150k - $200k": [150001, 200000],
  "$200k - $250k": [200001, 250000],
};

// ৩০টি প্রপার্টি যুক্ত করুন (যেটা আপনি আগেই করেছেন)
// এখানে ধরুন `allProperties` কনটেন্ট আগে থেকেই আছে...
const allProperties = [
  {
    id: 1,
    area: "Downtown",
    type: "Studio",
    price: 149821,
    bedrooms: 1,
    bath: 2,
    size: "750 sq ft",
    images: [
      "/images/property-4.webp",
      "/images/property-1.webp",
      "/images/property-2.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 2,
    area: "Suburb",
    type: "Apartment",
    price: 255015,
    bedrooms: 3,
    bath: 1,
    size: "550 sq ft",
    images: [
      "/images/property-1.webp",
      "/images/property-6.webp",
      "/images/property-2.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 3,
    area: "Uptown",
    type: "Apartment",
    price: 216403,
    bedrooms: 2,
    bath: 2,
    size: "700 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-3.webp",
      "/images/property-4.webp",
      "/images/property-2.webp",
    ],
  },
  {
    id: 4,
    area: "Downtown",
    type: "House",
    price: 198237,
    bedrooms: 1,
    bath: 1,
    size: "800 sq ft",
    images: [
      "/images/property-3.webp",
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 5,
    area: "Suburb",
    type: "Studio",
    price: 146209,
    bedrooms: 1,
    bath: 1,
    size: "900 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-3.webp",
      "/images/property-6.webp",
      "/images/property-1.webp",
    ],
  },
  {
    id: 6,
    area: "Uptown",
    type: "House",
    price: 246187,
    bedrooms: 2,
    bath: 2,
    size: "800 sq ft",
    images: [
      "/images/property-5.webp",
      "/images/property-4.webp",
      "/images/property-3.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 7,
    area: "Downtown",
    type: "Apartment",
    price: 228303,
    bedrooms: 1,
    bath: 2,
    size: "700 sq ft",
    images: [
      "/images/property-1.webp",
      "/images/property-2.webp",
      "/images/property-3.webp",
      "/images/property-4.webp",
    ],
  },
  {
    id: 8,
    area: "Suburb",
    type: "Studio",
    price: 125198,
    bedrooms: 1,
    bath: 1,
    size: "500 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-4.webp",
      "/images/property-2.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 9,
    area: "Uptown",
    type: "House",
    price: 238742,
    bedrooms: 2,
    bath: 2,
    size: "900 sq ft",
    images: [
      "/images/property-5.webp",
      "/images/property-6.webp",
      "/images/property-2.webp",
      "/images/property-1.webp",
    ],
  },
  {
    id: 10,
    area: "Downtown",
    type: "Apartment",
    price: 187201,
    bedrooms: 3,
    bath: 1,
    size: "750 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-4.webp",
      "/images/property-3.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 11,
    area: "Uptown",
    type: "Studio",
    price: 140578,
    bedrooms: 1,
    bath: 1,
    size: "500 sq ft",
    images: [
      "/images/property-4.webp",
      "/images/property-5.webp",
      "/images/property-1.webp",
      "/images/property-2.webp",
    ],
  },
  {
    id: 12,
    area: "Suburb",
    type: "Apartment",
    price: 232144,
    bedrooms: 2,
    bath: 2,
    size: "800 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-3.webp",
      "/images/property-4.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 13,
    area: "Downtown",
    type: "House",
    price: 214733,
    bedrooms: 3,
    bath: 2,
    size: "850 sq ft",
    images: [
      "/images/property-3.webp",
      "/images/property-1.webp",
      "/images/property-5.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 14,
    area: "Suburb",
    type: "Studio",
    price: 138211,
    bedrooms: 1,
    bath: 1,
    size: "550 sq ft",
    images: [
      "/images/property-4.webp",
      "/images/property-5.webp",
      "/images/property-6.webp",
      "/images/property-3.webp",
    ],
  },
  {
    id: 15,
    area: "Uptown",
    type: "Apartment",
    price: 179886,
    bedrooms: 2,
    bath: 2,
    size: "650 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-2.webp",
      "/images/property-3.webp",
    ],
  },
  {
    id: 16,
    area: "Downtown",
    type: "Apartment",
    price: 167380,
    bedrooms: 2,
    bath: 1,
    size: "600 sq ft",
    images: [
      "/images/property-3.webp",
      "/images/property-4.webp",
      "/images/property-2.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 17,
    area: "Suburb",
    type: "House",
    price: 243145,
    bedrooms: 3,
    bath: 2,
    size: "900 sq ft",
    images: [
      "/images/property-5.webp",
      "/images/property-3.webp",
      "/images/property-6.webp",
      "/images/property-2.webp",
    ],
  },
  {
    id: 18,
    area: "Uptown",
    type: "Studio",
    price: 154098,
    bedrooms: 1,
    bath: 1,
    size: "500 sq ft",
    images: [
      "/images/property-1.webp",
      "/images/property-3.webp",
      "/images/property-5.webp",
      "/images/property-4.webp",
    ],
  },
  {
    id: 19,
    area: "Downtown",
    type: "House",
    price: 198673,
    bedrooms: 2,
    bath: 1,
    size: "750 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-1.webp",
      "/images/property-6.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 20,
    area: "Suburb",
    type: "Apartment",
    price: 222704,
    bedrooms: 3,
    bath: 2,
    size: "850 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-3.webp",
      "/images/property-1.webp",
      "/images/property-4.webp",
    ],
  },
  {
    id: 21,
    area: "Downtown",
    type: "Studio",
    price: 135401,
    bedrooms: 1,
    bath: 1,
    size: "550 sq ft",
    images: [
      "/images/property-5.webp",
      "/images/property-2.webp",
      "/images/property-1.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 22,
    area: "Uptown",
    type: "Apartment",
    price: 229733,
    bedrooms: 2,
    bath: 2,
    size: "800 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-4.webp",
      "/images/property-5.webp",
      "/images/property-6.webp",
    ],
  },
  {
    id: 23,
    area: "Suburb",
    type: "House",
    price: 251421,
    bedrooms: 3,
    bath: 2,
    size: "900 sq ft",
    images: [
      "/images/property-4.webp",
      "/images/property-3.webp",
      "/images/property-1.webp",
      "/images/property-2.webp",
    ],
  },
  {
    id: 24,
    area: "Downtown",
    type: "Studio",
    price: 142917,
    bedrooms: 1,
    bath: 1,
    size: "600 sq ft",
    images: [
      "/images/property-1.webp",
      "/images/property-2.webp",
      "/images/property-3.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 25,
    area: "Uptown",
    type: "House",
    price: 218764,
    bedrooms: 2,
    bath: 2,
    size: "700 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-2.webp",
      "/images/property-3.webp",
    ],
  },
  {
    id: 26,
    area: "Suburb",
    type: "Apartment",
    price: 179665,
    bedrooms: 2,
    bath: 1,
    size: "650 sq ft",
    images: [
      "/images/property-3.webp",
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-5.webp",
    ],
  },
  {
    id: 27,
    area: "Downtown",
    type: "House",
    price: 240981,
    bedrooms: 3,
    bath: 2,
    size: "850 sq ft",
    images: [
      "/images/property-5.webp",
      "/images/property-4.webp",
      "/images/property-6.webp",
      "/images/property-3.webp",
    ],
  },
  {
    id: 28,
    area: "Suburb",
    type: "Studio",
    price: 126350,
    bedrooms: 1,
    bath: 1,
    size: "500 sq ft",
    images: [
      "/images/property-2.webp",
      "/images/property-3.webp",
      "/images/property-5.webp",
      "/images/property-4.webp",
    ],
  },
  {
    id: 29,
    area: "Uptown",
    type: "Apartment",
    price: 210430,
    bedrooms: 2,
    bath: 2,
    size: "700 sq ft",
    images: [
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-4.webp",
      "/images/property-2.webp",
    ],
  },
  {
    id: 30,
    area: "Downtown",
    type: "House",
    price: 257313,
    bedrooms: 3,
    bath: 2,
    size: "900 sq ft",
    images: [
      "/images/property-3.webp",
      "/images/property-6.webp",
      "/images/property-1.webp",
      "/images/property-5.webp",
    ],
  },
];

// Custom arrows
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
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".filter-sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    }
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
    const areaMatch = area ? p.area === area : true;
    const typeMatch = type ? p.type === type : true;
    const rangeMatch = range
      ? p.price >= ranges[range][0] && p.price <= ranges[range][1]
      : true;
    const categoryMatch =
      category === "All"
        ? true
        : category === "Studio"
        ? p.type === "Studio"
        : category === "1 Bed Room"
        ? p.bedrooms === 1
        : category === "2 Bed Room"
        ? p.bedrooms === 2
        : true;
    return areaMatch && typeMatch && rangeMatch && categoryMatch;
  });

  const handleReset = () => {
    setArea("");
    setType("");
    setRange("");
    setCategory("All");
  };

  return (
    <>
      <section className="property-grid-section">
        {sidebarOpen && <div className="filter-overlay" ref={overlayRef}></div>}
        <div className="container">
          <h2 className="title-4 center">Discover Properties</h2>

          {/* Filters */}
          <div className="property-filter-wrap">
            <div className="top-filter">
              <div className="filter-group">
                <label>Property Area</label>
                <select value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Choose Area</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Suburb">Suburb</option>
                  <option value="Uptown">Uptown</option>
                </select>
              </div>

              <div className="line"></div>
              <div className="filter-group">
                <label>Property Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Choose Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Studio">Studio</option>
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
              {/* Category Filter Buttons */}
              <div className="category-filter">
                {["All", "Studio", "1 Bed Room", "2 Bed Room"].map((cat) => (
                  <button
                    key={cat}
                    className={category === cat ? "active" : ""}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sidebar Toggle */}
              <div className="btn">
                <button
                  className="filter-sidebar-toggle"
                  onClick={() => setSidebarOpen(true)}
                >
                  <FaFilter /> Filters
                </button>
              </div>
            </div>

            {/* Right Slide Filter Sidebar */}
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
                  <option value="Downtown">Downtown</option>
                  <option value="Suburb">Suburb</option>
                  <option value="Uptown">Uptown</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Studio">Studio</option>
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

          {/* Property Cards */}
          <div className="property-grid">
            {filtered.map((property, index) => (
              <div className="property-card" key={index}>
                <div className="image-wrapper">
                  <Slider {...sliderSettings}>
                    {property.images.map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt={`Property ${property.id} - ${i + 1}`}
                        width={600}
                        height={400}
                        layout="responsive"
                      />
                    ))}
                  </Slider>
                </div>
                <div className="property-info">
                  <h4>{property.price.toLocaleString()} $</h4>
                  <button className="details-btn">View Details</button>
                </div>
                <ul className="property-meta">
                  <li>
                    <span>
                      <FaHome />
                    </span>{" "}
                    {property.bedrooms} Bedrooms
                  </li>
                  <li>
                    <span>
                      <FaBath />
                    </span>{" "}
                    {property.bath} Bath
                  </li>
                  <li>
                    <span>
                      <LuRuler />
                    </span>{" "}
                    {property.size}
                  </li>
                  <li>
                    <span>
                      <FaMapMarkerAlt />
                    </span>{" "}
                    {property.area}
                  </li>
                  <li>
                    <span>
                      <FaBuilding />
                    </span>{" "}
                    {property.type}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
