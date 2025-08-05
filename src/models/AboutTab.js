// ✅ /src/models/AboutTab.js
import mongoose from "mongoose";

const CounterObject = {
  title: { type: String, required: true },
  num: { type: String, required: true },
};

const AboutTabSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    counters: {
      type: [CounterObject],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length === 3;
        },
        message: "counters must have exactly 3 items.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.AboutTab ||
  mongoose.model("AboutTab", AboutTabSchema);
