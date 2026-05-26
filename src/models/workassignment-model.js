const mongoose = require("mongoose");

const workAssignmentSchema =
  new mongoose.Schema(
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },

      clientName: String,

      workDetails: String,

      assignDate: Date,

      status: {
        type: String,
        enum: [
          "Pending",
          "In Progress",
          "Completed",
        ],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "WorkAssignment",
  workAssignmentSchema
);