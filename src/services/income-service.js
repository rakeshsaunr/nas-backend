const incomeRepository = require("../repositories/income-repository");

// ==============================
// Create Income
// ==============================
const createIncomeService = async (payload) => {
  // Only allow fields defined in the model
  const {
    date,
    owner,
    partyName,
    mobileNumber,
    workType,
    productDetails,
    purchaseAmount,
    saleAmount,
    serviceCharge,
    totalAmount,
    actualProfit,
    receiptAmount,
    dueAmount,
    dueDate,
    paymentMode,
    invoiceNumber,
    remarks,
  } = payload;

  // Required field checks (could enhance as necessary)
  if (!date) {
    throw new Error("Date is required");
  }
  if (!owner) {
    throw new Error("Owner is required");
  }
  if (!partyName) {
    throw new Error("Party name is required");
  }
  if (totalAmount === undefined) {
    throw new Error("Total amount is required");
  }
  if (receiptAmount === undefined) {
    throw new Error("Receipt amount is required");
  }

  // Calculate dueAmount if not provided
  const computedDueAmount =
    dueAmount !== undefined
      ? dueAmount
      : Number(totalAmount || 0) - Number(receiptAmount || 0);

  const newIncome = {
    date,
    owner,
    partyName,
    mobileNumber,
    workType,
    productDetails,
    purchaseAmount,
    saleAmount,
    serviceCharge,
    totalAmount,
    actualProfit,
    receiptAmount,
    dueAmount: computedDueAmount,
    dueDate,
    paymentMode,
    invoiceNumber,
    remarks,
  };

  return await incomeRepository.createIncome(newIncome);
};

// ==============================
// Get All Income
// ==============================
const getAllIncomeService = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    startDate = "",
    endDate = "",
  } = query;

  return await incomeRepository.getAllIncome(
    Number(page),
    Number(limit),
    search,
    startDate,
    endDate
  );
};

// ==============================
// Get Income By ID
// ==============================
const getIncomeByIdService = async (id) => {
  const income = await incomeRepository.getIncomeById(id);
  if (!income) {
    throw new Error("Income not found");
  }
  return income;
};

// ==============================
// Update Income
// ==============================
const updateIncomeService = async (id, payload) => {
  // Only allow fields defined in the model for update
  const updateFields = {};
  [
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
    "remarks",
  ].forEach((field) => {
    if (payload[field] !== undefined) {
      updateFields[field] = payload[field];
    }
  });

  // Auto-calculate dueAmount if both totalAmount and receiptAmount are provided
  if (
    updateFields.totalAmount !== undefined &&
    updateFields.receiptAmount !== undefined
  ) {
    updateFields.dueAmount =
      Number(updateFields.totalAmount) -
      Number(updateFields.receiptAmount);
  }

  const updatedIncome = await incomeRepository.updateIncome(id, updateFields);

  if (!updatedIncome) {
    throw new Error("Income not found");
  }

  return updatedIncome;
};

// ==============================
// Delete Income
// ==============================
const deleteIncomeService = async (id) => {
  const deletedIncome = await incomeRepository.deleteIncome(id);
  if (!deletedIncome) {
    throw new Error("Income not found");
  }
  return deletedIncome;
};

module.exports = {
  createIncomeService,
  getAllIncomeService,
  getIncomeByIdService,
  updateIncomeService,
  deleteIncomeService,
};