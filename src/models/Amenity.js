// src/models/Amenity.js
import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, default: "" },
    slug: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Amenity ||
  mongoose.model("Amenity", AmenitySchema);
