import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  agentEmail: { type: String, required: true, unique: true },
  agentNumber: { type: String, required: true },
  InvoiceCount: { type: Number, default: 0 },       // optional
  InvoiceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }], // optional

}, { timestamps: true });

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
