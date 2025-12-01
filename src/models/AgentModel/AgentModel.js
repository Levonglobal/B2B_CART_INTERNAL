import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  agentEmail: { type: String, required: true, unique: true },
  agentNumber: { type: String, required: true },

  // SIMPLE TARGET SYSTEM
  target: { type: Number, default: 0 },          // Assigned target
  targetAchieved: { type: Number, default: 0 },  // Total achieved via invoices

  InvoiceCount: { type: Number, default: 0 },
  InvoiceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }],
}, { timestamps: true });

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
