// =====================================
// routes/v1/employee-routes.js
// =====================================

const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require("../../controllers/employee-controller");

// CREATE
router.post("/", createEmployee);

// GET ALL
router.get("/", getAllEmployees);

// GET BY ID
router.get("/:id", getEmployeeById);

// UPDATE
router.put("/:id", updateEmployeeById);

// DELETE
router.delete("/:id", deleteEmployeeById);

module.exports = router;