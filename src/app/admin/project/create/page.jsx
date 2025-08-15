// ✅ src/app/admin/project/create/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

// 🧰 Static options (same as Edit page)
const BEDROOM_OPTIONS = [
  "Studio",
  "1BR",
  "2BR",
  "3BR",
  "4BR",
  "5BR+",
  "Penthouse",
];
const BATHROOM_OPTIONS = ["1BA", "2BA", "3BA", "4BA", "5BA+"];

const PROJECT_STATUS = [
  "Active Sales",
  "Under Construction",
  "Completed Portfolio",
  "Coming Soon",
  "Sold Out",
];
const EXPECTED_COMPLETIONS = [
  "Ready Now",
  "Q1 2025",
  "Q2 2025",
  "Q3 2025",
  "Q4 2025",
  "Q1 2026",
  "Q2 2026",
  "Q3 2026",
  "Q4 2026",
  "2027",
  "2028",
  "TBD",
];

const PRICE_DISPLAY = ["Starting from", "Price Range", "On Request"];

const EMIRATE_COUNTRY = [
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Sharjah, UAE",
  "Ajman, UAE",
  "Ras Al Khaimah, UAE",
  "Fujairah, UAE",
  "Umm Al Quwain, UAE",
  "Muscat, Oman",
  "Salalah, Oman",
  "Beirut, Lebanon",
  "Bhamdoun, Lebanon",
];

const SUITABLE_FOR = ["End User", "Investment", "Both"];
const TARGET_AUDIENCE = [
  "First Time Buyer",
  "Luxury Buyer",
  "Family",
  "Young Professional",
  "Expat",
  "Local National",
  "GCC National",
  "International",
];

const PAYMENT_PLANS = [
  "Cash",
  "10/90",
  "20/80",
  "30/70",
  "50/50",
  "Construction Linked",
  "Post Handover",
  "Flexible",
  "Bank Financing",
  "Custom",
];
const TITLE_DEEDS = [
  "Freehold",
  "Leasehold 99 years",
  "Leasehold 50 years",
  "Usufruct",
];
const OWNERSHIP = [
  "UAE Nationals Only",
  "GCC Nationals",
  "All Foreigners",
  "Restricted",
];
const NOC_STATUSES = ["Approved", "Pending", "Not Required"];

const IMAGE_ARRAY_KEYS = [
  "masterPlanImages",
  "elevationViews",
  "interiorDesignImages",
  "amenitiesImages",
  "locationMapImages",
  "progressPhotos",
  "virtualTourImages",
];

export default function CreateProjectPage() {
  const router = useRouter();

  const [amenities, setAmenities] = useState([]);

  const [form, setForm] = useState({
    // ===== Basic =====
    title: "",
    slug: "",
    description: "",
    isFeatured: false,

    // Images (existing)
    featuredImages: [],
    sidebarImages: [],
    gallery: [],

    // ===== Pricing Structure =====
    priceStarting: "",
    priceMaximum: "",
    priceDisplayType: "",
    serviceChargePerSqFt: "",
    bookingAmount: "",
    registrationFee: "",

    // ===== Unit Fields =====
    bedroomConfig: [],
    bathroomConfig: [],
    sqftStarting: "",
    sqftMaximum: "",

    // ===== Status & Timeline =====
    projectStatus: "",
    completionDate: "",
    launchDate: "",
    expectedCompletion: "",

    // ===== Property Details =====
    propertyType: "",
    totalUnits: "",
    availableUnits: "",
    unitsSold: "",
    buildingFloors: "",
    builtYear: "",
    plotSize: "",
    builtUpArea: "",
    carpetArea: "",
    ceilingHeight: "",
    parkingSpacesPerUnit: "",

    // ===== Location Enhancement =====
    propertyArea: "",
    emirateCountry: "",
    areaDistrict: "",
    subArea: "",
    nearbyLandmarks: "",
    distanceAirport: "",
    distanceMetro: "",
    distanceBeach: "",

    // ===== Amenities (refs) =====
    amenities: [],

    // ===== Address + Map =====
    address: "",
    mapIframe: "",

    // ===== Investment =====
    expectedROI: "",
    rentalYield: "",
    capitalAppreciation: "",
    mortgageAvailable: false, // radio (Yes/No)
    bankFinancingPercentage: "",
    suitableFor: [],
    targetAudience: [],

    // ===== Payment & Legal =====
    paymentPlanType: "",
    paymentPlanDetails: "", // textarea
    downPaymentPercentage: "",
    titleDeedType: "",
    ownershipEligibility: "",
    reraRegistrationNumber: "",
    escrowAccount: false, // radio (Yes/No)
    nocStatus: "",

    // ===== Extra Media (arrays) =====
    masterPlanImages: [],
    elevationViews: [],
    interiorDesignImages: [],
    amenitiesImages: [],
    locationMapImages: [],
    progressPhotos: [],
    virtualTourImages: [],

    // ===== Documents (single URLs) =====
    projectBrochure: "",
    floorPlansPdf: "",
    paymentPlanPdf: "",
    masterPlanPdf: "",
    nocDocuments: "",
    reraCertificate: "",

    // ===== Video Embeds (NEW) =====
    promotionalVideo: "", // iframe/text
    virtualTourVideo: "", // iframe/text
    droneFootage: "", // iframe/text

    // ===== Floorplan (existing) =====
    unit: "",
    suite: "",
    balconySize: "",
    total: "",
    image: "",
  });

  useEffect(() => {
    const loadAmenities = async () => {
      const res = await fetch("/api/amenity");
      const data = await res.json();
      setAmenities((data.amenities || []).filter((a) => a.isActive));
    };
    loadAmenities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setRadioBoolean = (name, yes) => {
    setForm((prev) => ({ ...prev, [name]: !!yes }));
  };

  const toggleAmenity = (id) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(id);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((x) => x !== id)
          : [...prev.amenities, id],
      };
    });
  };

  const toggleMulti = (key, val) => {
    setForm((prev) => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];
      const exists = arr.includes(val);
      return {
        ...prev,
        [key]: exists ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const removeImage = (key, url) => {
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((img) => img !== url),
    }));
  };

  const handleImageUpload = async (e, key, single = false) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const uploaded = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data?.success && data?.url) uploaded.push(data.url);
    }
    if (single) {
      setForm((prev) => ({ ...prev, [key]: uploaded[0] || "" }));
    } else {
      setForm((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...uploaded],
      }));
    }
  };

  const clearSingleFile = (key) => setForm((prev) => ({ ...prev, [key]: "" }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/project");
    else alert("Project creation failed");
  };

  if (!amenities) return null;

  return (
    <div className="blog-form">
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        {/* ===== Basic ===== */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="slug"
          placeholder="Slug (optional)"
          value={form.slug}
          onChange={handleInputChange}
          className="input"
        />
        <ReactQuill
          theme="snow"
          value={form.description}
          onChange={(v) => setForm((p) => ({ ...p, description: v }))}
        />

        {/* Featured */}
        <div className="ad-label-flex sm">
          <div className="ad-label-group">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleInputChange}
            />
            <label htmlFor="isFeatured">Set Featured Project</label>
          </div>
        </div>

        {/* ===== Pricing Structure ===== */}
        <h2>Pricing Structure</h2>
        <div className="grid-2">
          <input
            className="input"
            name="priceDisplayType"
            placeholder="Price Display Type"
            list="priceDisplayTypeList"
            value={form.priceDisplayType}
            onChange={handleInputChange}
          />
          <datalist id="priceDisplayTypeList">
            {PRICE_DISPLAY.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            className="input"
            name="priceStarting"
            placeholder="Starting Price"
            value={form.priceStarting}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="priceMaximum"
            placeholder="Maximum Price"
            value={form.priceMaximum}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="serviceChargePerSqFt"
            placeholder="Service Charge per Sq Ft"
            value={form.serviceChargePerSqFt}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="bookingAmount"
            placeholder="Booking Amount"
            value={form.bookingAmount}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="registrationFee"
            placeholder="Registration Fee"
            value={form.registrationFee}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Unit Fields ===== */}
        <h2>Unit Fields</h2>
        <p>Bedroom Configuration</p>
        <div className="ad-label-flex">
          {BEDROOM_OPTIONS.map((v) => (
            <div className="ad-label-group sm" key={v}>
              <input
                id={`bed-${v}`}
                type="checkbox"
                checked={(form.bedroomConfig || []).includes(v)}
                onChange={() => toggleMulti("bedroomConfig", v)}
              />
              <label htmlFor={`bed-${v}`}>{v}</label>
            </div>
          ))}
        </div>
        <p>Bathroom Configuration</p>
        <div className="ad-label-flex">
          {BATHROOM_OPTIONS.map((v) => (
            <div className="ad-label-group sm" key={v}>
              <input
                id={`bath-${v}`}
                type="checkbox"
                checked={(form.bathroomConfig || []).includes(v)}
                onChange={() => toggleMulti("bathroomConfig", v)}
              />
              <label htmlFor={`bath-${v}`}>{v}</label>
            </div>
          ))}
        </div>
        <div className="grid-2">
          <input
            className="input"
            name="sqftStarting"
            placeholder="Starting Size Sq ft"
            value={form.sqftStarting}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="sqftMaximum"
            placeholder="Maximum Size Sq ft"
            value={form.sqftMaximum}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Project Status & Timeline ===== */}
        <h2>Project Status & Timeline</h2>
        <div className="grid-2">
          <input
            className="input"
            name="projectStatus"
            placeholder="Status"
            list="statusList"
            value={form.projectStatus}
            onChange={handleInputChange}
          />
          <datalist id="statusList">
            {PROJECT_STATUS.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <p>Launch Date</p>
          <input
            className="input"
            type="date"
            name="launchDate"
            value={form.launchDate}
            onChange={handleInputChange}
          />
          <p>Completion Date</p>
          <input
            className="input"
            type="date"
            name="completionDate"
            value={form.completionDate}
            onChange={handleInputChange}
          />

          <input
            className="input"
            name="expectedCompletion"
            placeholder="Expected Completion"
            list="expCompList"
            value={form.expectedCompletion}
            onChange={handleInputChange}
          />
          <datalist id="expCompList">
            {EXPECTED_COMPLETIONS.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
        </div>

        {/* ===== Property Details ===== */}
        <h2>Property Details</h2>
        <div className="grid-3">
          <input
            className="input"
            name="propertyType"
            placeholder="Property Type"
            value={form.propertyType}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="totalUnits"
            placeholder="Total Units"
            value={form.totalUnits}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="availableUnits"
            placeholder="Available Units"
            value={form.availableUnits}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="unitsSold"
            placeholder="Units Sold"
            value={form.unitsSold}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="buildingFloors"
            placeholder="Building Floors"
            value={form.buildingFloors}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="builtYear"
            placeholder="Built Year"
            value={form.builtYear}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="plotSize"
            placeholder="Plot Size"
            value={form.plotSize}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="builtUpArea"
            placeholder="Built-up Area"
            value={form.builtUpArea}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="carpetArea"
            placeholder="Carpet Area"
            value={form.carpetArea}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="ceilingHeight"
            placeholder="Ceiling Height"
            value={form.ceilingHeight}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="parkingSpacesPerUnit"
            placeholder="Parking Spaces per Unit"
            value={form.parkingSpacesPerUnit}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Location Enhancement ===== */}
        <h2>Location Enhancement</h2>
        <div className="grid-2">
          <input
            className="input"
            name="propertyArea"
            placeholder="Property Area"
            value={form.propertyArea}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="emirateCountry"
            placeholder="Emirate/Country"
            list="emirateList"
            value={form.emirateCountry}
            onChange={handleInputChange}
          />
          <datalist id="emirateList">
            {EMIRATE_COUNTRY.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            className="input"
            name="areaDistrict"
            placeholder="Area/District"
            value={form.areaDistrict}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="subArea"
            placeholder="Sub-Area"
            value={form.subArea}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="nearbyLandmarks"
            placeholder="Nearby Landmarks"
            value={form.nearbyLandmarks}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="distanceAirport"
            placeholder="Distance to Airport"
            value={form.distanceAirport}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="distanceMetro"
            placeholder="Distance to Metro Station"
            value={form.distanceMetro}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="distanceBeach"
            placeholder="Distance to Beach"
            value={form.distanceBeach}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Amenities (ref) ===== */}
        <h2>Amenities</h2>
        <div className="ad-label-flex">
          {amenities.map((a) => (
            <div className="ad-label-group sm" key={a._id}>
              <input
                id={a._id}
                type="checkbox"
                checked={form.amenities.includes(a._id)}
                onChange={() => toggleAmenity(a._id)}
              />
              <label htmlFor={a._id}>{a.name}</label>
            </div>
          ))}
        </div>

        {/* ===== Investment Information ===== */}
        <h2>Investment Information</h2>
        <div className="grid-3">
          <input
            className="input"
            name="expectedROI"
            placeholder="Expected ROI"
            value={form.expectedROI}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="rentalYield"
            placeholder="Rental Yield"
            value={form.rentalYield}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="capitalAppreciation"
            placeholder="Capital Appreciation"
            value={form.capitalAppreciation}
            onChange={handleInputChange}
          />

          {/* Mortgage Available — radio Yes/No */}
          <div className="ad-label-group">
            <label className="block">Mortgage Available</label>
            <div style={{ display: "flex", gap: 12 }}>
              <label>
                <input
                  type="radio"
                  name="mortgageAvailableRadio"
                  checked={form.mortgageAvailable === true}
                  onChange={() => setRadioBoolean("mortgageAvailable", true)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="mortgageAvailableRadio"
                  checked={form.mortgageAvailable === false}
                  onChange={() => setRadioBoolean("mortgageAvailable", false)}
                />{" "}
                No
              </label>
            </div>
          </div>

          <input
            className="input"
            name="bankFinancingPercentage"
            placeholder="Bank Financing %"
            value={form.bankFinancingPercentage}
            onChange={handleInputChange}
          />
        </div>

        <p>Suitable For</p>
        <div className="ad-label-flex">
          {SUITABLE_FOR.map((v) => (
            <div className="ad-label-group sm" key={v}>
              <input
                id={`sf-${v}`}
                type="checkbox"
                checked={(form.suitableFor || []).includes(v)}
                onChange={() => toggleMulti("suitableFor", v)}
              />
              <label htmlFor={`sf-${v}`}>{v}</label>
            </div>
          ))}
        </div>
        <p>Target Audience</p>
        <div className="ad-label-flex">
          {TARGET_AUDIENCE.map((v) => (
            <div className="ad-label-group sm" key={v}>
              <input
                id={`ta-${v}`}
                type="checkbox"
                checked={(form.targetAudience || []).includes(v)}
                onChange={() => toggleMulti("targetAudience", v)}
              />
              <label htmlFor={`ta-${v}`}>{v}</label>
            </div>
          ))}
        </div>

        {/* ===== Payment & Legal ===== */}
        <h2>Payment & Legal</h2>
        <div className="grid-3">
          <input
            className="input"
            name="paymentPlanType"
            placeholder="Payment Plan Type"
            list="paymentList"
            value={form.paymentPlanType}
            onChange={handleInputChange}
          />
          <datalist id="paymentList">
            {PAYMENT_PLANS.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            className="input"
            name="downPaymentPercentage"
            placeholder="Down Payment %"
            value={form.downPaymentPercentage}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="titleDeedType"
            placeholder="Title Deed Type"
            list="deedList"
            value={form.titleDeedType}
            onChange={handleInputChange}
          />
          <datalist id="deedList">
            {TITLE_DEEDS.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            className="input"
            name="ownershipEligibility"
            placeholder="Ownership Eligibility"
            list="ownerList"
            value={form.ownershipEligibility}
            onChange={handleInputChange}
          />
          <datalist id="ownerList">
            {OWNERSHIP.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            className="input"
            name="reraRegistrationNumber"
            placeholder="RERA Registration Number"
            value={form.reraRegistrationNumber}
            onChange={handleInputChange}
          />

          {/* Escrow Account — radio Yes/No */}
          <div className="ad-label-group">
            <label className="block">Escrow Account</label>
            <div style={{ display: "flex", gap: 12 }}>
              <label>
                <input
                  type="radio"
                  name="escrowAccountRadio"
                  checked={form.escrowAccount === true}
                  onChange={() => setRadioBoolean("escrowAccount", true)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="escrowAccountRadio"
                  checked={form.escrowAccount === false}
                  onChange={() => setRadioBoolean("escrowAccount", false)}
                />{" "}
                No
              </label>
            </div>
          </div>

          <input
            className="input"
            name="nocStatus"
            placeholder="NOC Status"
            list="nocList"
            value={form.nocStatus}
            onChange={handleInputChange}
          />
          <datalist id="nocList">
            {NOC_STATUSES.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
        </div>

        <div className="ad-label-group">
          <label>Payment Plan Details</label>
          <textarea
            className="input"
            name="paymentPlanDetails"
            rows={4}
            value={form.paymentPlanDetails}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Video Fields (NEW) ===== */}
        <h2>Project Videos</h2>
        <div className="ad-label-group">
          <label>Project Promotional Video (iframe)</label>
          <textarea
            className="input"
            name="promotionalVideo"
            rows={3}
            placeholder='<iframe src="..."></iframe>'
            value={form.promotionalVideo}
            onChange={handleInputChange}
          />
        </div>
        <div className="ad-label-group">
          <label>Virtual Tour Video (iframe)</label>
          <textarea
            className="input"
            name="virtualTourVideo"
            rows={3}
            placeholder='<iframe src="..."></iframe>'
            value={form.virtualTourVideo}
            onChange={handleInputChange}
          />
        </div>
        <div className="ad-label-group">
          <label>Drone Footage (iframe)</label>
          <textarea
            className="input"
            name="droneFootage"
            rows={3}
            placeholder='<iframe src="..."></iframe>'
            value={form.droneFootage}
            onChange={handleInputChange}
          />
        </div>

        {/* ===== Address + Map ===== */}
        <h2>Address & Map</h2>
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="mapIframe"
          placeholder="Map iframe"
          value={form.mapIframe}
          onChange={handleInputChange}
          className="input"
        />

        {/* ===== Images (existing) ===== */}
        <h2>Images</h2>
        {["featuredImages", "sidebarImages", "gallery"].map((key) => (
          <div className="ad-label-group" key={key}>
            <label>Upload {key}</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, key)}
            />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(form[key] || []).map((url, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <Image src={url} width={80} height={80} alt={key} />
                  <button
                    type="button"
                    onClick={() => removeImage(key, url)}
                    style={removeBtnStyle}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ===== Additional Media (arrays) ===== */}
        <h2>Additional Media</h2>
        {IMAGE_ARRAY_KEYS.map((key) => (
          <div className="ad-label-group" key={key}>
            <label>Upload {key}</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, key)}
            />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(form[key] || []).map((url, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <Image src={url} width={80} height={80} alt={key} />
                  <button
                    type="button"
                    onClick={() => removeImage(key, url)}
                    style={removeBtnStyle}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ===== Documents (single) ===== */}
        <h2>Documents</h2>
        {[
          ["projectBrochure", "Project Brochure"],
          ["floorPlansPdf", "Floor Plans PDF"],
          ["paymentPlanPdf", "Payment Plan PDF"],
          ["masterPlanPdf", "Master Plan PDF"],
          ["nocDocuments", "NOC Documents"],
          ["reraCertificate", "RERA Certificate"],
        ].map(([key, label]) => (
          <div className="ad-label-group" key={key}>
            <label>{label}</label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, key, true)}
            />
            {form[key] && (
              <div
                style={{
                  marginTop: 8,
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <a
                  href={form[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  {form[key]}
                </a>
                <button
                  type="button"
                  onClick={() => clearSingleFile(key)}
                  style={removeBtnStyleSmall}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}

        {/* ===== Floorplan ===== */}
        <h2>Floorplan Info</h2>
        <div className="grid-2">
          <input
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="suite"
            placeholder="Suite"
            value={form.suite}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="balconySize"
            placeholder="Balcony Size"
            value={form.balconySize}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="total"
            placeholder="Total"
            value={form.total}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="ad-label-group">
          <label>Upload Floorplan Image:</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, "image", true)}
          />
          {form.image && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image
                src={form.image}
                width={120}
                height={120}
                alt="floorplan"
              />
              <button
                type="button"
                onClick={() => clearSingleFile("image")}
                style={removeBtnStyleSmall}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn">
          Submit Project
        </button>
      </form>
    </div>
  );
}

const removeBtnStyle = {
  position: "absolute",
  top: 5,
  right: -5,
  background: "#d33",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 20,
  height: 20,
  fontSize: 12,
  cursor: "pointer",
};

const removeBtnStyleSmall = {
  position: "absolute",
  top: -6,
  right: -10,
  background: "#d33",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 18,
  height: 18,
  fontSize: 11,
  cursor: "pointer",
};
