import Invoice from "../../models/InvoiceModel/InvoiceModel.js";

export const getTDSReport = async (req, res) => {
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

      {
        $addFields: {
          tdsAmountCorrect: {
            $cond: [
              { $eq: ["$currency", "INR"] },
              "$TotalTDSAmount",        // If INR → use normal TDS
              "$TotalTDSAmountINR"      // If USD → use INR converted TDS
            ]
          }
        }
      },

      {
        $group: {
          _id: null,
          totalInvoiceCount: { $sum: 1 },
          totalTDSAmount: { $sum: "$tdsAmountCorrect" }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        totalInvoiceCount: 0,
        totalTDSAmount: 0
      });
    }

    return res.status(200).json(result[0]);

  } catch (error) {
    console.error("TDS Report Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
