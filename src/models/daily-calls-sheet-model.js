// =====================================
// src/models/daily-calls-sheet-model.js
// =====================================

const mongoose = require("mongoose");

const dailyCallSheetSchema =
  new mongoose.Schema(
    {
      // =====================================
      // SERIAL NUMBER
      // =====================================

      srNo: {
        type: Number,
        unique: true,
      },

      // =====================================
      // CALL ENTRY
      // =====================================

      callEntry: {
        type:
          mongoose.Schema.Types.Mixed,

        default: null,
      },

      // =====================================
      // CALL NUMBER
      // =====================================

      callNo: {
        type:
          mongoose.Schema.Types.Mixed,

        default: "",
      },

      // =====================================
      // CALL DATE
      // =====================================

      callDate: {
        type: Date,
      },

      // =====================================
      // CALL ATTEMPT
      // =====================================

      callAttempt: {
        type: Number,
        default: 1,
      },

      // =====================================
      // CUSTOMER
      // =====================================

      customer: {
        type:
          mongoose.Schema.Types.Mixed,

        default: null,
      },

      customerName: {
        type: String,
        trim: true,
        default: "",
      },

      customerContactNo: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================
      // EMPLOYEE
      // =====================================

      technicianAssigned: {
        type:
          mongoose.Schema.Types.Mixed,

        default: null,
      },

      // =====================================
      // STATUS
      // =====================================

      status: {
        type:
          mongoose.Schema.Types.Mixed,

        default: null,
      },

      // =====================================
      // TIMING
      // =====================================

      timing: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================
      // REMARKS
      // =====================================

      remarks: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================
      // COMMENTS
      // =====================================

      comments: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================
      // ATTACHMENT
      // =====================================

      attachment: {
        type:
          mongoose.Schema.Types.Mixed,

        default: null,
      },

      // =====================================
      // APPROVAL STATUS
      // =====================================

      approvalStatus: {
        type: String,

        enum: [
          "Pending",
          "Approved",
          "Rejected",
        ],

        default: "Pending",
      },
    },

    {
      timestamps: true,
    }
  );

// =====================================
// AUTO GENERATE SR NO
// =====================================

dailyCallSheetSchema.pre(
  "save",

  async function (next) {

    try {

      if (!this.srNo) {

        const Counter =
          mongoose.connection.collection(
            "dailycallsheetcounters"
          );

        const counter =
          await Counter.findOneAndUpdate(

            {
              _id:
                "dailyCallSheet",
            },

            {
              $inc: {
                seq: 1,
              },
            },

            {
              upsert: true,
              returnDocument:
                "after",
            }
          );

        let srNo;

        if (
          counter &&
          counter.value &&
          typeof counter.value
            .seq === "number"
        ) {

          srNo =
            counter.value.seq;

        } else if (
          counter &&
          typeof counter.seq ===
            "number"
        ) {

          srNo =
            counter.seq;

        } else {

          return next(
            new Error(
              "Failed to generate SR No"
            )
          );
        }

        this.srNo = srNo;
      }

      next();

    } catch (error) {

      next(error);
    }
  }
);

// =====================================
// MODEL
// =====================================

const DailyCallSheet =
  mongoose.models
    .DailyCallSheet ||

  mongoose.model(
    "DailyCallSheet",
    dailyCallSheetSchema
  );

module.exports =
  DailyCallSheet;