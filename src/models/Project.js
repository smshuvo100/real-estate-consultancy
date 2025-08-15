// src/models/Project.js
import mongoose from "mongoose";

// 🏗️ Main Project Schema
const ProjectSchema = new mongoose.Schema(
  {
    // 🟩 Basic Info
    title: { type: String, required: true }, // Title
    slug: { type: String, unique: true }, // Unique slug
    description: { type: String, required: true },

    // ⭐ Featured
    isFeatured: { type: Boolean, default: false },

    // 🖼️ Images
    featuredImages: [String],
    sidebarImages: [String],

    // ✅ Pricing Structure
    priceStarting: String,
    priceMaximum: String,
    priceDisplayType: String, // "Starting from" | "Price Range" | "On Request"
    serviceChargePerSqFt: String,
    bookingAmount: String,
    registrationFee: String,

    // ✅ Unit Fields
    bedroomConfig: [String], // ["Studio","1BR","2BR","3BR","4BR","5BR+","Penthouse"]
    bathroomConfig: [String], // ["1BA","2BA","3BA","4BA","5BA+"]
    sqftStarting: String,
    sqftMaximum: String,

    // ✅ Project Status & Timeline
    projectStatus: String, // "Active Sales" | "Under Construction" | ...
    completionDate: Date,
    launchDate: Date,
    expectedCompletion: String, // "Ready Now" | "Q1 2025" | ... | "TBD"

    // ✅ Property Details
    propertyType: String,
    totalUnits: String,
    availableUnits: String,
    unitsSold: String,
    buildingFloors: String,
    builtYear: String,
    plotSize: String,
    builtUpArea: String,
    carpetArea: String,
    ceilingHeight: String,
    parkingSpacesPerUnit: String,

    // ✅ Location Enhancement
    propertyArea: String,
    emirateCountry: String,
    areaDistrict: String,
    subArea: String,
    nearbyLandmarks: String,
    distanceAirport: String,
    distanceMetro: String,
    distanceBeach: String,

    // ✅ Amenities (reference)
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],

    // ✅ Navigation
    address: String,
    mapIframe: String,

    // ✅ Gallery
    gallery: [String],

    // ✅ Investment Information
    expectedROI: String,
    rentalYield: String,
    capitalAppreciation: String,
    mortgageAvailable: { type: Boolean, default: false }, // radio (Yes/No in UI)
    bankFinancingPercentage: String,
    suitableFor: [String], // ["End User","Investment","Both"]
    targetAudience: [String], // ["First Time Buyer","Luxury Buyer",...]

    // ✅ Payment & Legal
    paymentPlanType: String, // "Cash","10/90","20/80","30/70","50/50","Construction Linked","Post Handover","Flexible","Bank Financing","Custom"
    paymentPlanDetails: String, // textarea
    downPaymentPercentage: String,
    titleDeedType: String, // "Freehold", "Leasehold 99 years", "Leasehold 50 years", "Usufruct"
    ownershipEligibility: String, // "UAE Nationals Only","GCC Nationals","All Foreigners","Restricted"
    reraRegistrationNumber: String,
    escrowAccount: { type: Boolean, default: false }, // radio (Yes/No in UI)
    nocStatus: String, // "Approved","Pending","Not Required"

    // ✅ Extra Media (arrays)
    masterPlanImages: [String],
    elevationViews: [String],
    interiorDesignImages: [String],
    amenitiesImages: [String],
    locationMapImages: [String],
    progressPhotos: [String],
    virtualTourImages: [String],

    // ✅ Documents (single file URLs)
    projectBrochure: String,
    floorPlansPdf: String,
    paymentPlanPdf: String,
    masterPlanPdf: String,
    nocDocuments: String,
    reraCertificate: String,

    // ✅ Videos (NEW)
    promotionalVideo: String, // iframe/text
    virtualTourVideo: String, // iframe/text
    droneFootage: String, // iframe/text

    // 🟥 Floorplans (existing section)
    unit: String,
    suite: String,
    balconySize: String,
    total: String,
    image: String, // floorplan image
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
