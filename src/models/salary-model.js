const mongoose = require("mongoose");

const salarySchema =
  new mongoose.Schema(
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },

      month: String,

      salaryAmount: Number,

      paymentStatus: {
        type: String,
        enum: [
          "Pending",
          "Paid",
        ],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Salary",
  salarySchema
);