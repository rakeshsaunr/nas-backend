const express = require("express");
const router = express.Router();

const incomeRepository = require("../../repositories/income-repository");

// ================= CREATE INCOME =================
// Accepts only fields allowed in income-model.js (date, owner, partyName, mobileNumber, workType, productDetails, purchaseAmount, saleAmount, serviceCharge, totalAmount, actualProfit, receiptAmount, dueAmount, dueDate, paymentMode, invoiceNumber, remarks)
router.post("/", async (req, res) => {
  try {
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
      remarks
    } = req.body;

    // Only pick allowed fields
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
      dueAmount,
      dueDate,
      paymentMode,
      invoiceNumber,
      remarks
    };

    const income = await incomeRepository.createIncome(newIncome);
    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ================= GET ALL INCOMES =================
// Optional: supports search, page, limit, startDate, endDate as in income-repository.js
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, startDate, endDate } = req.query;
    const result = await incomeRepository.getAllIncome(
      Number(page) || 1, 
      Number(limit) || 10,
      search || "",
      startDate || "",
      endDate || ""
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= GET SINGLE INCOME BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const income = await incomeRepository.getIncomeById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= UPDATE INCOME =================
router.put("/:id", async (req, res) => {
  try {
    // Only allow updating fields defined in schema
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
      remarks
    } = req.body;
    
    const updateData = {
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
      remarks
    };

    const updatedIncome = await incomeRepository.updateIncome(req.params.id, updateData);
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ================= DELETE INCOME =================
router.delete("/:id", async (req, res) => {
  try {
    const deletedIncome = await incomeRepository.deleteIncome(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;