// /src/models/TeamMember.js
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model("TeamMember", teamMemberSchema);
