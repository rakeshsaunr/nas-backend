// =====================================
// controllers/employee-controller.js
// =====================================

const {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeByIdService,
  deleteEmployeeByIdService,
} = require("../services/employee-service");

// CREATE
const createEmployee = async (req, res) => {
  try {
    const employee = await createEmployeeService(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create employee",
    });
  }
};

// GET ALL
const getAllEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployeesService();

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch employees",
    });
  }
};

// GET BY ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await getEmployeeByIdService(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch employee",
    });
  }
};

// UPDATE
const updateEmployeeById = async (req, res) => {
  try {
    const employee = await updateEmployeeByIdService(req.params.id, req.body);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update employee",
    });
  }
};

// DELETE
const deleteEmployeeById = async (req, res) => {
  try {
    const employee = await deleteEmployeeByIdService(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete employee",
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};