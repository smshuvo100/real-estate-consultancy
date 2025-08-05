// ✅ 1. Model: /src/models/ProjectFaq.js
import mongoose from "mongoose";

const ProjectFaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ProjectFaq ||
  mongoose.model("ProjectFaq", ProjectFaqSchema);
