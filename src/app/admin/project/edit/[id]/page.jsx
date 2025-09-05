// src/app/admin/project/edit/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

// 🧰 Static options from sheet
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

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [amenities, setAmenities] = useState([]);

  // helpers
  const ensureArray = (v) => (Array.isArray(v) ? v : []);
  const ensureBool = (v) => !!v;

  const setRadioBoolean = (name, yes) => {
    setForm((prev) => ({ ...prev, [name]: !!yes }));
  };

  useEffect(() => {
    const fetchAll = async () => {
      // Load amenities
      const aRes = await fetch("/api/amenity");
      const aData = await aRes.json();
      const activeAmenities = (aData.amenities || []).filter((a) => a.isActive);
      setAmenities(activeAmenities);

      // Load projects list and match by id
      const res = await fetch("/api/project");
      const data = await res.json();
      const project = (data.projects || []).find((p) => p._id === id);
      if (!project) {
        alert("Project not found");
        return;
      }

      setForm({
        ...project,
        // arrays
        amenities: ensureArray(project.amenities).map(String),
        bedroomConfig: ensureArray(project.bedroomConfig),
        bathroomConfig: ensureArray(project.bathroomConfig),
        suitableFor: ensureArray(project.suitableFor),
        targetAudience: ensureArray(project.targetAudience),
        gallery: ensureArray(project.gallery),
        featuredImages: ensureArray(project.featuredImages),
        sidebarImages: ensureArray(project.sidebarImages),
        masterPlanImages: ensureArray(project.masterPlanImages),
        elevationViews: ensureArray(project.elevationViews),
        interiorDesignImages: ensureArray(project.interiorDesignImages),
        amenitiesImages: ensureArray(project.amenitiesImages),
        locationMapImages: ensureArray(project.locationMapImages),
        progressPhotos: ensureArray(project.progressPhotos),
        virtualTourImages: ensureArray(project.virtualTourImages),
        // booleans
        isFeatured: ensureBool(project.isFeatured),
        mortgageAvailable: ensureBool(project.mortgageAvailable),
        escrowAccount: ensureBool(project.escrowAccount),
        // videos (strings)
        promotionalVideo: project.promotionalVideo || "",
        virtualTourVideo: project.virtualTourVideo || "",
        droneFootage: project.droneFootage || "",
      });
    };
    fetchAll();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAmenity = (amenityId) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenityId);
      const next = exists
        ? prev.amenities.filter((x) => x !== amenityId)
        : [...prev.amenities, amenityId];
      return { ...prev, amenities: next };
    });
  };

  const toggleMulti = (key, val) => {
    setForm((prev) => {
      const arr = ensureArray(prev[key]);
      const exists = arr.includes(val);
      const next = exists ? arr.filter((x) => x !== val) : [...arr, val];
      return { ...prev, [key]: next };
    });
  };

  const removeImage = (key, url) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((img) => img !== url),
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
        [key]: [...ensureArray(prev[key]), ...uploaded],
      }));
    }
  };

  const clearSingleFile = (key) => setForm((prev) => ({ ...prev, [key]: "" }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/project", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/project");
    else alert("Project update failed");
  };

  if (!form) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <section className="admin-form-sec">
      <div className="blog-form">
        <h1>Edit Project</h1>
        <form onSubmit={handleSubmit}>
          {/* ===== Basic ===== */}
          <div className="form-grid-2">
            <div className="ad-form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="slug">Slug (optional)</label>
              <input
                id="slug"
                name="slug"
                value={form.slug || ""}
                onChange={handleInputChange}
                placeholder="Slug (optional)"
                className="input"
              />
            </div>
          </div>
          <div className="ad-form-group">
            <label htmlFor="description">Description</label>
            <ReactQuill
              id="description"
              value={form.description}
              onChange={(v) => setForm((prev) => ({ ...prev, description: v }))}
            />
          </div>

          {/* Featured */}
          <div className="ad-label-flex sm">
            <div className="ad-label-group">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={!!form.isFeatured}
                onChange={handleInputChange}
              />
              <label htmlFor="isFeatured">Set Featured Project</label>
            </div>
          </div>

          {/* ===== Pricing Structure ===== */}
          <h2>Pricing Structure</h2>
          <div className="form-grid-3">
            <div className="ad-form-group">
              <label htmlFor="priceDisplayType">Price Display Type</label>
              <input
                id="priceDisplayType"
                className="input"
                name="priceDisplayType"
                placeholder="Price Display Type"
                list="priceDisplayTypeList"
                value={form.priceDisplayType || ""}
                onChange={handleInputChange}
              />
              <datalist id="priceDisplayTypeList">
                {PRICE_DISPLAY.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="priceStarting">Starting Price</label>
              <input
                id="priceStarting"
                className="input"
                name="priceStarting"
                placeholder="Starting Price"
                value={form.priceStarting || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="priceMaximum">Maximum Price</label>
              <input
                id="priceMaximum"
                className="input"
                name="priceMaximum"
                placeholder="Maximum Price"
                value={form.priceMaximum || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="serviceChargePerSqFt">
                Service Charge per Sq Ft
              </label>
              <input
                id="serviceChargePerSqFt"
                className="input"
                name="serviceChargePerSqFt"
                placeholder="Service Charge per Sq Ft"
                value={form.serviceChargePerSqFt || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="bookingAmount">Booking Amount</label>
              <input
                id="bookingAmount"
                className="input"
                name="bookingAmount"
                placeholder="Booking Amount"
                value={form.bookingAmount || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="registrationFee">Registration Fee</label>
              <input
                id="registrationFee"
                className="input"
                name="registrationFee"
                placeholder="Registration Fee"
                value={form.registrationFee || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* ===== Unit Fields ===== */}
          <h2>Unit Fields</h2>

          <div className="ad-form-group">
            <label>Bedroom Configuration</label>
            <div className="ad-label-flex">
              {BEDROOM_OPTIONS.map((v) => (
                <div className="ad-label-group sm" key={v}>
                  <input
                    id={`bed-${v}`}
                    type="checkbox"
                    checked={ensureArray(form.bedroomConfig).includes(v)}
                    onChange={() => toggleMulti("bedroomConfig", v)}
                  />
                  <label htmlFor={`bed-${v}`}>{v}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="ad-form-group">
            <label>Bathroom Configuration</label>
            <div className="ad-label-flex">
              {BATHROOM_OPTIONS.map((v) => (
                <div className="ad-label-group sm" key={v}>
                  <input
                    id={`bath-${v}`}
                    type="checkbox"
                    checked={ensureArray(form.bathroomConfig).includes(v)}
                    onChange={() => toggleMulti("bathroomConfig", v)}
                  />
                  <label htmlFor={`bath-${v}`}>{v}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="ad-form-group">
              <label htmlFor="sqftStarting">Starting Size Sq ft</label>
              <input
                id="sqftStarting"
                className="input"
                name="sqftStarting"
                placeholder="Starting Size Sq ft"
                value={form.sqftStarting || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="sqftMaximum">Maximum Size Sq ft</label>
              <input
                id="sqftMaximum"
                className="input"
                name="sqftMaximum"
                placeholder="Maximum Size Sq ft"
                value={form.sqftMaximum || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* ===== Project Status & Timeline ===== */}
          <h2>Project Status & Timeline</h2>
          <div className="form-grid-2">
            <div className="ad-form-group">
              <label htmlFor="projectStatus">Status</label>
              <input
                id="projectStatus"
                className="input"
                name="projectStatus"
                placeholder="Status"
                list="statusList"
                value={form.projectStatus || ""}
                onChange={handleInputChange}
              />
              <datalist id="statusList">
                {PROJECT_STATUS.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="launchDate">Launch Date</label>
              <input
                id="launchDate"
                className="input"
                type="date"
                name="launchDate"
                value={
                  form.launchDate
                    ? String(form.launchDate).substring(0, 10)
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="completionDate">Completion Date</label>
              <input
                id="completionDate"
                className="input"
                type="date"
                name="completionDate"
                value={
                  form.completionDate
                    ? String(form.completionDate).substring(0, 10)
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="expectedCompletion">Expected Completion</label>
              <input
                id="expectedCompletion"
                className="input"
                name="expectedCompletion"
                placeholder="Expected Completion"
                list="expCompList"
                value={form.expectedCompletion || ""}
                onChange={handleInputChange}
              />
              <datalist id="expCompList">
                {EXPECTED_COMPLETIONS.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
          </div>

          {/* ===== Property Details ===== */}
          <h2>Property Details</h2>
          <div className="form-grid-4">
            <div className="ad-form-group">
              <label htmlFor="propertyType">Property Type</label>
              <input
                id="propertyType"
                className="input"
                name="propertyType"
                placeholder="Property Type"
                value={form.propertyType || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="totalUnits">Total Units</label>
              <input
                id="totalUnits"
                className="input"
                name="totalUnits"
                placeholder="Total Units"
                value={form.totalUnits || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="availableUnits">Available Units</label>
              <input
                id="availableUnits"
                className="input"
                name="availableUnits"
                placeholder="Available Units"
                value={form.availableUnits || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="unitsSold">Units Sold</label>
              <input
                id="unitsSold"
                className="input"
                name="unitsSold"
                placeholder="Units Sold"
                value={form.unitsSold || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="buildingFloors">Building Floors</label>
              <input
                id="buildingFloors"
                className="input"
                name="buildingFloors"
                placeholder="Building Floors"
                value={form.buildingFloors || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="builtYear">Built Year</label>
              <input
                id="builtYear"
                className="input"
                name="builtYear"
                placeholder="Built Year"
                value={form.builtYear || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="plotSize">Plot Size</label>
              <input
                id="plotSize"
                className="input"
                name="plotSize"
                placeholder="Plot Size"
                value={form.plotSize || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="builtUpArea">Built-up Area</label>
              <input
                id="builtUpArea"
                className="input"
                name="builtUpArea"
                placeholder="Built-up Area"
                value={form.builtUpArea || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="carpetArea">Carpet Area</label>
              <input
                id="carpetArea"
                className="input"
                name="carpetArea"
                placeholder="Carpet Area"
                value={form.carpetArea || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="ceilingHeight">Ceiling Height</label>
              <input
                id="ceilingHeight"
                className="input"
                name="ceilingHeight"
                placeholder="Ceiling Height"
                value={form.ceilingHeight || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="parkingSpacesPerUnit">
                Parking Spaces per Unit
              </label>
              <input
                id="parkingSpacesPerUnit"
                className="input"
                name="parkingSpacesPerUnit"
                placeholder="Parking Spaces per Unit"
                value={form.parkingSpacesPerUnit || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* ===== Location Enhancement ===== */}
          <h2>Location Enhancement</h2>
          <div className="form-grid-4">
            <div className="ad-form-group">
              <label htmlFor="propertyArea">Property Area</label>
              <input
                id="propertyArea"
                className="input"
                name="propertyArea"
                placeholder="Property Area"
                value={form.propertyArea || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="emirateCountry">Emirate/Country</label>
              <input
                id="emirateCountry"
                className="input"
                name="emirateCountry"
                placeholder="Emirate/Country"
                list="emirateList"
                value={form.emirateCountry || ""}
                onChange={handleInputChange}
              />
              <datalist id="emirateList">
                {EMIRATE_COUNTRY.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="areaDistrict">Area/District</label>
              <input
                id="areaDistrict"
                className="input"
                name="areaDistrict"
                placeholder="Area/District"
                value={form.areaDistrict || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="subArea">Sub-Area</label>
              <input
                id="subArea"
                className="input"
                name="subArea"
                placeholder="Sub-Area"
                value={form.subArea || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="nearbyLandmarks">Nearby Landmarks</label>
              <input
                id="nearbyLandmarks"
                className="input"
                name="nearbyLandmarks"
                placeholder="Nearby Landmarks"
                value={form.nearbyLandmarks || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="distanceAirport">Distance to Airport</label>
              <input
                id="distanceAirport"
                className="input"
                name="distanceAirport"
                placeholder="Distance to Airport"
                value={form.distanceAirport || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="distanceMetro">Distance to Metro Station</label>
              <input
                id="distanceMetro"
                className="input"
                name="distanceMetro"
                placeholder="Distance to Metro Station"
                value={form.distanceMetro || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="distanceBeach">Distance to Beach</label>
              <input
                id="distanceBeach"
                className="input"
                name="distanceBeach"
                placeholder="Distance to Beach"
                value={form.distanceBeach || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* ===== Amenities (reference) ===== */}
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
          <div className="form-grid-4">
            <div className="ad-form-group">
              <label htmlFor="expectedROI">Expected ROI</label>
              <input
                id="expectedROI"
                className="input"
                name="expectedROI"
                placeholder="Expected ROI"
                value={form.expectedROI || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="rentalYield">Rental Yield</label>
              <input
                id="rentalYield"
                className="input"
                name="rentalYield"
                placeholder="Rental Yield"
                value={form.rentalYield || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="capitalAppreciation">Capital Appreciation</label>
              <input
                id="capitalAppreciation"
                className="input"
                name="capitalAppreciation"
                placeholder="Capital Appreciation"
                value={form.capitalAppreciation || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="ad-form-group">
              <label htmlFor="bankFinancingPercentage">Bank Financing %</label>
              <input
                id="bankFinancingPercentage"
                className="input"
                name="bankFinancingPercentage"
                placeholder="Bank Financing %"
                value={form.bankFinancingPercentage || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Mortgage Available — radio */}
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

          <p>Suitable For</p>
          <div className="ad-label-flex">
            {SUITABLE_FOR.map((v) => (
              <div className="ad-label-group sm" key={v}>
                <input
                  id={`sf-${v}`}
                  type="checkbox"
                  checked={ensureArray(form.suitableFor).includes(v)}
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
                  checked={ensureArray(form.targetAudience).includes(v)}
                  onChange={() => toggleMulti("targetAudience", v)}
                />
                <label htmlFor={`ta-${v}`}>{v}</label>
              </div>
            ))}
          </div>

          {/* ===== Payment & Legal ===== */}
          <h2>Payment & Legal</h2>
          <div className="form-grid-3">
            <div className="ad-form-group">
              <label htmlFor="paymentPlanType">Payment Plan Type</label>
              <input
                id="paymentPlanType"
                className="input"
                name="paymentPlanType"
                placeholder="Payment Plan Type"
                list="paymentList"
                value={form.paymentPlanType || ""}
                onChange={handleInputChange}
              />
              <datalist id="paymentList">
                {PAYMENT_PLANS.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="downPaymentPercentage">Down Payment %</label>
              <input
                id="downPaymentPercentage"
                className="input"
                name="downPaymentPercentage"
                placeholder="Down Payment %"
                value={form.downPaymentPercentage || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="titleDeedType">Title Deed Type</label>
              <input
                id="titleDeedType"
                className="input"
                name="titleDeedType"
                placeholder="Title Deed Type"
                list="deedList"
                value={form.titleDeedType || ""}
                onChange={handleInputChange}
              />
              <datalist id="deedList">
                {TITLE_DEEDS.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="ownershipEligibility">
                Ownership Eligibility
              </label>
              <input
                id="ownershipEligibility"
                className="input"
                name="ownershipEligibility"
                placeholder="Ownership Eligibility"
                list="ownerList"
                value={form.ownershipEligibility || ""}
                onChange={handleInputChange}
              />
              <datalist id="ownerList">
                {OWNERSHIP.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>

            <div className="ad-form-group">
              <label htmlFor="reraRegistrationNumber">
                RERA Registration Number
              </label>
              <input
                id="reraRegistrationNumber"
                className="input"
                name="reraRegistrationNumber"
                placeholder="RERA Registration Number"
                value={form.reraRegistrationNumber || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="nocStatus">NOC Status</label>
              <input
                id="nocStatus"
                className="input"
                name="nocStatus"
                placeholder="NOC Status"
                list="nocList"
                value={form.nocStatus || ""}
                onChange={handleInputChange}
              />
              <datalist id="nocList">
                {NOC_STATUSES.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
          </div>
          {/* Escrow Account — radio */}
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
          <div className="ad-label-group">
            <label>Payment Plan Details</label>
            <textarea
              className="input"
              name="paymentPlanDetails"
              rows={4}
              value={form.paymentPlanDetails || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* ===== Videos (NEW) ===== */}
          <h2>Project Videos</h2>
          <div className="ad-label-group">
            <label>Project Promotional Video (iframe)</label>
            <textarea
              className="input"
              name="promotionalVideo"
              rows={3}
              placeholder='<iframe src="..."></iframe>'
              value={form.promotionalVideo || ""}
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
              value={form.virtualTourVideo || ""}
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
              value={form.droneFootage || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* ===== Address + Map ===== */}
          <h2>Address & Map</h2>
          <div className="">
            <div className="ad-form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                value={form.address || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Address"
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="mapIframe">Map iframe</label>
              <input
                id="mapIframe"
                name="mapIframe"
                value={form.mapIframe || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Map iframe"
              />
            </div>
          </div>

          {/* ===== Images: existing keys ===== */}
          <h2>Images</h2>
          <div className="form-grid-3 ">
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
          </div>

          {/* ===== Additional Media ===== */}
          <h2>Additional Media</h2>
          <div className="form-grid-3">
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
          </div>

          {/* ===== Documents ===== */}
          <h2>Documents</h2>
          <div className="form-grid-3">
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
          </div>

          {/* ===== Floorplan ===== */}
          <h2>Floorplan Info</h2>
          <div className="form-grid-4">
            <div className="ad-form-group">
              <label htmlFor="unit">Unit</label>
              <input
                id="unit"
                name="unit"
                value={form.unit || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Unit"
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="suite">Suite</label>
              <input
                id="suite"
                name="suite"
                value={form.suite || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Suite"
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="balconySize">Balcony Size</label>
              <input
                id="balconySize"
                name="balconySize"
                value={form.balconySize || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Balcony Size"
              />
            </div>

            <div className="ad-form-group">
              <label htmlFor="total">Total</label>
              <input
                id="total"
                name="total"
                value={form.total || ""}
                onChange={handleInputChange}
                className="input"
                placeholder="Total"
              />
            </div>
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
            Update Project
          </button>
        </form>
      </div>
    </section>
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
