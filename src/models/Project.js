// src/models/Project.js
import mongoose from "mongoose";

// 🏗️ Main Project Schema
const ProjectSchema = new mongoose.Schema(
  {
    // 🟩 Basic Info
    title: { type: String, required: true }, // 1: Title
    slug: { type: String, unique: true }, // ✅ Unique slug
    description: { type: String, required: true }, // 2: Description

    // Set Featured Project
    isFeatured: { type: Boolean, default: false },

    // 🖼️ Images
    featuredImages: [String], // 3: Featured Images
    sidebarImages: [String], // 4: Sidebar 2 Images

    // 💰 Property Details
    price: String, // 5: Price
    bedrooms: String, // 6: Bedrooms
    bathrooms: String, // 7: Bathrooms
    sqft: String, // 8: Sq Ft
    propertyArea: String, // 9: Property Area
    propertyType: String, // 10: Property Type

    // ❌ Removed old boolean features: elevator, laundryFacility, walkInCloset, firePlace, balcony, garage

    // ✅ New: Amenity references
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],

    // 🟦 Navigation Section (17–18)
    address: String, // 17: Address
    mapIframe: String, // 18: Google Map iFrame

    // 🟪 Gallery Section (19)
    gallery: [String], // 19: Gallery

    // 🟥 Floorplans Section (20–24)
    unit: String, // 20: Unit (e.g. 1 BEDROOM + 1 SUITE + 1 BALCONY)
    suite: String, // 21: Suite (e.g. 479.10 SQ.FT.)
    balconySize: String, // 22: Balcony (e.g. 89.23 - 89.45 SQ.FT.)
    total: String, // 23: Total (e.g. 568.33 - 568.55 SQ.FT.)
    image: String, // 24: Floorplan image
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
