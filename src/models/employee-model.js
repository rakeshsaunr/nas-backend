const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
      trim: true,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);