import mongoose from "mongoose";

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: "Founder",
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error during dev
export const Founder =
  mongoose.models.Founder || mongoose.model("Founder", founderSchema);
