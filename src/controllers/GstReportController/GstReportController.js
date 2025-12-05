import { buildTaxAggregationStages } from "../../utils/TaxAggregationStages.js";
import Invoice from "../../models/InvoiceModel/InvoiceModel.js";

export const getGstReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      matchStage.InvoiceDate = { $gte: start, $lte: end };
    }

    const result = await Invoice.aggregate([
      { $match: matchStage },
      ...buildTaxAggregationStages("GST")
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        totalInvoiceCount: 0,
        totalGSTAmount: 0
      });
    }

    return res.status(200).json({
      totalInvoiceCount: result[0].totalInvoiceCount,
      totalGSTAmount: result[0].totalAmount
    });

  } catch (error) {
    console.error("GST Report Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
