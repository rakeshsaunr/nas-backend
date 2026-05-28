// =====================================
// controllers/daily-calls-sheet-controller.js
// =====================================

const service = require("../services/daily-calls-sheet-service");

// 1. Import the DailyCallSheet model for direct DB interaction:
const DailyCallSheet = require("../models/daily-calls-sheet-model");

// =====================================
// CREATE
// =====================================

const createDailyCallSheet = async (req, res) => {
  try {
    // Directly create and insert the document in the database
    const data = await DailyCallSheet.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Daily Call Sheet Created Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL
// =====================================

const getAllDailyCallSheets = async (req, res) => {
  try {
    const data = await service.getAllDailyCallSheets();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE
// =====================================

const getSingleDailyCallSheet = async (req, res) => {
  try {
    const data = await service.getSingleDailyCallSheet(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// UPDATE
// =====================================

const updateDailyCallSheet = async (req, res) => {
  try {
    const data = await service.updateDailyCallSheet(
      req.params.id,
      req.body
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Daily Call Sheet Updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// DELETE
// =====================================

const deleteDailyCallSheet = async (req, res) => {
  try {
    const data = await service.deleteDailyCallSheet(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Daily Call Sheet Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// SYNC OLD CALL ENTRY DATA
// =====================================

const syncOldData = async (req, res) => {
  try {
    const response = await service.syncOldCallEntries();

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDailyCallSheet,
  getAllDailyCallSheets,
  getSingleDailyCallSheet,
  updateDailyCallSheet,
  deleteDailyCallSheet,
  syncOldData,
};