// ==============================================
// controllers/report-controller.js
// ==============================================

const mongoose = require("mongoose");

const {
  createReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportByIdService,
  deleteReportByIdService,
} = require("../services/report-service");

// CREATE REPORT
const createReport = async (
  req,
  res
) => {
  try {
    const report =
      await createReportService(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Report created successfully",
      data: report,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create report",
    });
  }
};

// GET ALL REPORTS
const getAllReports = async (
  req,
  res
) => {
  try {
    const reports =
      await getAllReportsService();

    return res.status(200).json({
      success: true,
      totalReports: reports.length,
      data: reports,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch reports",
    });
  }
};

// GET REPORT BY ID
const getReportById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    const report =
      await getReportByIdService(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch report",
    });
  }
};

// UPDATE REPORT
const updateReportById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    const report =
      await updateReportByIdService(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Report updated successfully",
      data: report,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update report",
    });
  }
};

// DELETE REPORT
const deleteReportById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    await deleteReportByIdService(id);

    return res.status(200).json({
      success: true,
      message:
        "Report deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete report",
    });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReportById,
  deleteReportById,
};