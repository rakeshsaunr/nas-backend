// =====================================
// repositories/employee-repository.js
// =====================================

const Employee = require("../models/employee-model");

// CREATE
const createEmployee = async (payload) => {
  try {
    const employee = await Employee.create(payload);
    return employee;
  } catch (error) {
    throw error;
  }
};

// GET ALL
const getAllEmployees = async () => {
  try {
    return await Employee.find({});
  } catch (error) {
    throw error;
  }
};

// GET BY ID
const getEmployeeById = async (id) => {
  try {
    return await Employee.findById(id);
  } catch (error) {
    throw error;
  }
};

// UPDATE
const updateEmployeeById = async (id, payload) => {
  try {
    return await Employee.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

// DELETE
const deleteEmployeeById = async (id) => {
  try {
    return await Employee.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};