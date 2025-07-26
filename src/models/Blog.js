import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    adminName: { type: String, required: true },
    views: { type: Number, default: 0 },
    category: { type: String, required: true },
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    content: { type: String, required: true }, // Tiptap rich text
    featuredImage: { type: String },
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
