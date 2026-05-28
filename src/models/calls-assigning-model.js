// =====================================
// models/calls-assigning-model.js
// =====================================

const mongoose = require("mongoose");

const callsAssigningSchema =
  new mongoose.Schema(
    {
      // =====================================
      // REFERENCES
      // =====================================

      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },

      callType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CallMaster",
      },

      natureOfCall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CallNatureMaster",
      },

      instrument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InstrumentMaster",
      },

      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },

      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeMaster",
        required: true,
      },

      // Added Designation Master reference
      designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DesignationMaster",
      },

      // Added Customer Master reference
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerMaster",
      },

      // Added End User Master reference
      endUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EndUserMaster",
      },

      status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StatusMaster",
      },

      priority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CallUrgency",
      },

      callNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CallEntry",
        required: true,
      },

      // =====================================
      // DATE & TIME
      // =====================================

      preferredDate: {
        type: Date,
      },

      preferredTime: {
        type: String,
      },

      assignDate: {
        type: Date,
        default: Date.now,
      },

      assignTime: {
        type: String,
      },

      targetDate: {
        type: Date,
      },

      targetTime: {
        type: String,
      },

      // =====================================
      // CALL DETAILS
      // =====================================

      approxCloseTime: {
        type: String,
        required: true,
      },

      assignedBy: {
        type: String,
        trim: true,
      },

      remarks: {
        type: String,
        trim: true,
      },

      // =====================================
      // CLOUDINARY FILES
      // =====================================

      attachment: {
        public_id: {
          type: String,
        },

        url: {
          type: String,
        },
      },

      audio: {
        public_id: {
          type: String,
        },

        url: {
          type: String,
        },
      },

      // =====================================
      // STATUS
      // =====================================

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
  "CallsAssigning",
  callsAssigningSchema
);