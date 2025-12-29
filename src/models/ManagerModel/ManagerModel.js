import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", managerSchema);
export default Manager;


