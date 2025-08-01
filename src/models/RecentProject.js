// src/models/RecentProject.js
import mongoose from "mongoose";

const RecentProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RecentProject ||
  mongoose.model("RecentProject", RecentProjectSchema);
