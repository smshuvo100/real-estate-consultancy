// src/models/EmailRecipient.js
import mongoose from "mongoose";
const EmailRecipientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EmailRecipient ||
  mongoose.model("EmailRecipient", EmailRecipientSchema);
