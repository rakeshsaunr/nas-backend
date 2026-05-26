// ==============================================
// routes/report-routes.js
// ==============================================

const express = require("express");

const router = express.Router();

const {
  createReport,
  getAllReports,
  getReportById,
  updateReportById,
  deleteReportById,
} = require("../../controllers/report-controller");

// CREATE REPORT
router.post("/", createReport);

// GET ALL REPORTS
router.get("/", getAllReports);

// GET SINGLE REPORT
router.get("/:id", getReportById);

// UPDATE REPORT
router.put("/:id", updateReportById);

// DELETE REPORT
router.delete(
  "/:id",
  deleteReportById
);

module.exports = router;