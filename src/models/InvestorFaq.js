import mongoose from "mongoose";

const InvestorFaqSchema = new mongoose.Schema(
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

// Avoid model overwrite error in development
export default mongoose.models.InvestorFaq ||
  mongoose.model("InvestorFaq", InvestorFaqSchema);
