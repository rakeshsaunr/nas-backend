const incomeService = require("../services/income-service");

// Allowed fields according to income-model.js
const allowedIncomeFields = [
  "date",
  "owner",
  "partyName",
  "mobileNumber",
  "workType",
  "productDetails",
  "purchaseAmount",
  "saleAmount",
  "serviceCharge",
  "totalAmount",
  "actualProfit",
  "receiptAmount",
  "dueAmount",
  "dueDate",
  "paymentMode",
  "invoiceNumber",
  "remarks"
];

// Helper function to only pick allowed fields from an object
function pickAllowedFields(source) {
  const dest = {};
  allowedIncomeFields.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      dest[key] = source[key];
    }
  });
  return dest;
}

// ==============================
// Create Income
// ==============================
const createIncomeController = async (req, res) => {
  try {
    const incomePayload = pickAllowedFields(req.body);
    const income = await incomeService.createIncomeService(incomePayload);
    return res.status(201).json({
      success: true,
      message: "Income created successfully",
      data: income,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create income",
    });
  }
};

// ==============================
// Get All Income
// ==============================
const getAllIncomeController = async (req, res) => {
  try {
    const incomes = await incomeService.getAllIncomeService(req.query);
    return res.status(200).json({
      success: true,
      ...incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch income data",
    });
  }
};

// ==============================
// Get Income By ID
// ==============================
const getIncomeByIdController = async (req, res) => {
  try {
    const income = await incomeService.getIncomeByIdService(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch income by ID",
    });
  }
};

// ==============================
// Update Income
// ==============================
const updateIncomeController = async (req, res) => {
  try {
    const incomePayload = pickAllowedFields(req.body);
    const income = await incomeService.updateIncomeService(req.params.id, incomePayload);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: income,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update income",
    });
  }
};

// ==============================
// Delete Income
// ==============================
const deleteIncomeController = async (req, res) => {
  try {
    const deleted = await incomeService.deleteIncomeService(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to delete income",
    });
  }
};

// ==============================
// Get Income By Client Name
// ==============================
const getIncomeByClientNameController = async (req, res) => {
  try {
    const incomes = await incomeService.getIncomeByClientNameService(req.params.clientName);

    return res.status(200).json({
      success: true,
      count: Array.isArray(incomes) ? incomes.length : 0,
      data: incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch income by client name",
    });
  }
};

// ==============================
// Get Paid Income
// ==============================
const getPaidIncomeController = async (req, res) => {
  try {
    const incomes = await incomeService.getPaidIncomeService();

    return res.status(200).json({
      success: true,
      count: Array.isArray(incomes) ? incomes.length : 0,
      data: incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch paid incomes",
    });
  }
};

// ==============================
// Get Pending Income
// ==============================
const getPendingIncomeController = async (req, res) => {
  try {
    const incomes = await incomeService.getPendingIncomeService();

    return res.status(200).json({
      success: true,
      count: Array.isArray(incomes) ? incomes.length : 0,
      data: incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch pending incomes",
    });
  }
};

// ==============================
// Get Today Income
// ==============================
const getTodayIncomeController = async (req, res) => {
  try {
    const incomes = await incomeService.getTodayIncomeService();

    return res.status(200).json({
      success: true,
      count: Array.isArray(incomes) ? incomes.length : 0,
      data: incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch today's incomes",
    });
  }
};

// ==============================
// Get Monthly Income
// ==============================
const getMonthlyIncomeController = async (req, res) => {
  try {
    const { year, month } = req.params;
    const incomes = await incomeService.getMonthlyIncomeService(year, month);

    return res.status(200).json({
      success: true,
      count: Array.isArray(incomes) ? incomes.length : 0,
      data: incomes,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch monthly income",
    });
  }
};

// ==============================
// Get Income Summary
// ==============================
const getIncomeSummaryController = async (req, res) => {
  try {
    const summary = await incomeService.getIncomeSummaryService();

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch income summary",
    });
  }
};

// ==============================
// Technician Wise Income
// ==============================
const getTechnicianWiseIncomeController = async (req, res) => {
  try {
    const data = await incomeService.getTechnicianWiseIncomeService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch technician wise income",
    });
  }
};

// ==============================
// Payment Mode Summary
// ==============================
const getPaymentModeSummaryController = async (req, res) => {
  try {
    const data = await incomeService.getPaymentModeSummaryService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch payment mode summary",
    });
  }
};

module.exports = {
  createIncomeController,
  getAllIncomeController,
  getIncomeByIdController,
  updateIncomeController,
  deleteIncomeController,
  getIncomeByClientNameController,
  getPaidIncomeController,
  getPendingIncomeController,
  getTodayIncomeController,
  getMonthlyIncomeController,
  getIncomeSummaryController,
  getTechnicianWiseIncomeController,
  getPaymentModeSummaryController,
};