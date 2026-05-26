// ==============================================
// services/report-service.js
// ==============================================

const {
  createReportRepository,
  getAllReportsRepository,
  getReportByIdRepository,
  updateReportRepository,
  deleteReportRepository,
} = require("../repositories/report-repository");

// CREATE REPORT
const createReportService = async (data) => {
  try {
    return await createReportRepository(data);
  } catch (error) {
    throw error;
  }
};

// GET ALL REPORTS
const getAllReportsService = async () => {
  try {
    return await getAllReportsRepository();
  } catch (error) {
    throw error;
  }
};

// GET REPORT BY ID
const getReportByIdService = async (id) => {
  try {
    return await getReportByIdRepository(id);
  } catch (error) {
    throw error;
  }
};

// UPDATE REPORT BY ID
const updateReportByIdService = async (id, data) => {
  try {
    return await updateReportRepository(id, data);
  } catch (error) {
    throw error;
  }
};

// DELETE REPORT BY ID
const deleteReportByIdService = async (id) => {
  try {
    return await deleteReportRepository(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportByIdService,
  deleteReportByIdService,
};