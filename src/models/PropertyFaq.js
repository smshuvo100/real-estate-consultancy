import mongoose from "mongoose";

const PropertyFaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PropertyFaq ||
  mongoose.model("PropertyFaq", PropertyFaqSchema);
