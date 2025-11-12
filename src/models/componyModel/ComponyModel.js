import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Active"
    },
    invoiceCount: {
      type: Number,
      default: 0
    },
    invoiceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
      },
      

    ],
     ProformainvoiceCount: {
      type: Number,
      default: 0
    },
     ProformainvoiceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
      }]

  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
