import Invoice from "../../models/InvoiceModel/InvoiceModel.js";

export const getGstReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // end date 23:59:59.999
      end.setHours(23, 59, 59, 999);

      matchStage.InvoiceDate = {
        $gte: start,
        $lte: end
      };
    }

    const result = await Invoice.aggregate([
      { $match: matchStage },

      // ------------------------------------------
      //   SELECT BASECLOSURE AMOUNT BASED ON CURRENCY
      // ------------------------------------------
      {
        $addFields: {
          finalBaseClosureAmount: {
            $cond: [
              { $eq: ["$currency", "INR"] },
              "$baseClosureAmount",       // INR → baseClosureAmount
              "$baseClosureAmountINR"     // NON-INR → baseClosureAmountINR
            ]
          },

          gstAmountOnlyINR: {
            $cond: [
              { $eq: ["$currency", "INR"] },
              "$TotalGSTAmount",
              0
            ]
          }
        }
      },

      {
        $group: {
          _id: null,
          totalInvoiceCount: { $sum: 1 },

          // SUM of all base closures according to currency rule
          totalBaseClosureAmount: { $sum: "$finalBaseClosureAmount" },

          // GST only for INR
          totalGSTAmount: { $sum: "$gstAmountOnlyINR" }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        totalInvoiceCount: 0,
        totalBaseClosureAmount: 0,
        totalGSTAmount: 0
      });
    }

    return res.status(200).json(result[0]);

  } catch (error) {
    console.error("GST Report Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
