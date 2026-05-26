const mongoose = require("mongoose");

const callSlipSchema =
  new mongoose.Schema(
    {
      customerName: String,

      companyName: String,

      contactNumber: String,

      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },

      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },

      problemDescription: String,

      serviceStatus: String,
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CallSlip",
  callSlipSchema
);