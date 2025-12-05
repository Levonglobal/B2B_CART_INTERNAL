// utils/taxReportHelper.js

export const buildTaxAggregationStages = (type) => {
  // type = "GST" or "TDS"
  const fieldNormal = type === "GST" ? "$TotalGSTAmount" : "$TotalTDSAmount";
  const fieldINR = type === "GST" ? "$TotalGSTAmount" : "$TotalTDSAmountINR";

  return [
    // Select correct values based on currency
    {
      $addFields: {
        finalAmount: {
          $cond: [
            { $eq: ["$currency", "INR"] },
            fieldNormal,       // If INR → Normal GST/TDS
            fieldINR           // If USD → INR Converted
          ]
        }
      }
    },

    // Group and calculate total
    {
      $group: {
        _id: null,
        totalInvoiceCount: { $sum: 1 },
        totalAmount: { $sum: "$finalAmount" }
      }
    }
  ];
};
