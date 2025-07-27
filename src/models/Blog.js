// src/models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    adminName: { type: String, required: true },
    views: { type: Number, default: 0 },
    category: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDesc: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

// ✅ Automatically generate slug before saving
BlogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
