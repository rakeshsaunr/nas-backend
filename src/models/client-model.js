// =====================================
// src/models/client-model.js
// =====================================

const mongoose = require("mongoose");

const clientSchema =
  new mongoose.Schema(
    {
      clientName: {
        type: String,
        required: true,
        trim: true,
      },

      mobileNumber: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        trim: true,
      },

      gstNumber: {
        type: String,
        trim: true,
        uppercase: true,
      },

      companyName: {
        type: String,
        trim: true,
      },

      previousDue: {
        type: Number,
        default: 0,
      },

      totalBusiness: {
        type: Number,
        default: 0,
      },

      totalPaid: {
        type: Number,
        default: 0,
      },

      pendingAmount: {
        type: Number,
        default: 0,
      },

      lastServiceDate: {
        type: Date,
      },

      notes: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
        ],
        default: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Client",
    clientSchema
  );