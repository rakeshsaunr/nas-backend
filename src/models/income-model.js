const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    date: Date,

    owner: String,

    partyName: String,

    mobileNumber: String,

    workType: String,

    productDetails: String,

    purchaseAmount: Number,

    saleAmount: Number,

    serviceCharge: Number,

    totalAmount: Number,

    actualProfit: Number,

    receiptAmount: Number,

    dueAmount: Number,

    dueDate: Date,

    paymentMode: String,

    invoiceNumber: String,

    remarks: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Income",
  incomeSchema
);