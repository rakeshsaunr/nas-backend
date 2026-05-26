// income-repository.js

const mongoose = require("mongoose");
const Income = require("../models/income-model");

// ==============================
// Create Income
// ==============================
const createIncome = async (data) => {
  // Data fields are defined in income-model.js (date, owner, partyName, etc.)
  return await Income.create(data);
};

// ==============================
// Get All Income
// ==============================
const getAllIncome = async (
  page = 1,
  limit = 10,
  search = "",
  startDate = "",
  endDate = ""
) => {
  const query = {};

  // Search on plain fields (schema: date, owner, partyName, mobileNumber, workType, productDetails, purchaseAmount, saleAmount, serviceCharge, totalAmount, actualProfit, receiptAmount, dueAmount, dueDate, paymentMode, invoiceNumber, remarks)
  if (search) {
    query.$or = [
      { owner: { $regex: search, $options: "i" } },
      { partyName: { $regex: search, $options: "i" } },
      { invoiceNumber: { $regex: search, $options: "i" } },
      { mobileNumber: { $regex: search, $options: "i" } },
      { workType: { $regex: search, $options: "i" } },
      { productDetails: { $regex: search, $options: "i" } },
      { paymentMode: { $regex: search, $options: "i" } },
      { remarks: { $regex: search, $options: "i" } },
    ];
  }

  // Date filter
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const skip = (page - 1) * limit;

  const data = await Income.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Income.countDocuments(query);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data,
  };
};

// ==============================
// Get Income By ID
// ==============================
const getIncomeById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Income ID");
  }
  return await Income.findById(id);
};

// ==============================
// Update Income
// ==============================
const updateIncome = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Income ID");
  }
  // All updatable fields match the schema
  return await Income.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// ==============================
// Delete Income
// ==============================
const deleteIncome = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Income ID");
  }
  return await Income.findByIdAndDelete(id);
};

// ==============================
// Get Income By Party Name
// ==============================
const getIncomeByPartyName = async (partyName) => {
  return await Income.find({
    partyName: {
      $regex: partyName,
      $options: "i",
    },
  }).sort({ createdAt: -1 });
};

// ==============================
// Get Income By Payment Mode
// ==============================
const getIncomeByPaymentMode = async (paymentMode) => {
  return await Income.find({
    paymentMode: {
      $regex: paymentMode,
      $options: "i",
    },
  }).sort({ createdAt: -1 });
};

// ==============================
// Get Today Income
// ==============================
const getTodayIncome = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return await Income.find({
    date: { $gte: today, $lt: tomorrow },
  });
};

// ==============================
// Get Monthly Income
// ==============================
const getMonthlyIncome = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  return await Income.find({
    date: { $gte: startDate, $lt: endDate },
  });
};

// ==============================
// Income Summary
// ==============================
const getIncomeSummary = async () => {
  // The summary matches the model's number fields
  const summary = await Income.aggregate([
    {
      $group: {
        _id: null,
        totalPurchaseAmount: { $sum: "$purchaseAmount" },
        totalSaleAmount: { $sum: "$saleAmount" },
        totalServiceCharge: { $sum: "$serviceCharge" },
        totalAmount: { $sum: "$totalAmount" },
        totalActualProfit: { $sum: "$actualProfit" },
        totalReceiptAmount: { $sum: "$receiptAmount" },
        totalDueAmount: { $sum: "$dueAmount" },
        totalEntries: { $sum: 1 },
      },
    },
  ]);
  return (
    summary[0] || {
      totalPurchaseAmount: 0,
      totalSaleAmount: 0,
      totalServiceCharge: 0,
      totalAmount: 0,
      totalActualProfit: 0,
      totalReceiptAmount: 0,
      totalDueAmount: 0,
      totalEntries: 0,
    }
  );
};

// ==============================
// Payment Mode Summary
// ==============================
const getPaymentModeSummary = async () => {
  return await Income.aggregate([
    {
      $group: {
        _id: "$paymentMode",
        totalAmount: { $sum: "$totalAmount" },
        totalTransactions: { $sum: 1 },
      },
    },
    {
      $sort: { totalAmount: -1 },
    },
  ]);
};

module.exports = {
  createIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomeByPartyName,
  getIncomeByPaymentMode,
  getTodayIncome,
  getMonthlyIncome,
  getIncomeSummary,
  getPaymentModeSummary,
};