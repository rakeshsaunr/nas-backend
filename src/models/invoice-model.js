// =====================================
// src/models/invoice-model.js
// =====================================

const mongoose = require("mongoose");

const invoiceSchema =
  new mongoose.Schema(
    {
      // =====================================
      // RELATIONS
      // =====================================

      order: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      client: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
      },

      // =====================================
      // INVOICE INFO
      // =====================================

      invoiceNumber: {
        type: String,
        unique: true,
      },

      invoiceDate: {
        type: Date,
        default: Date.now,
      },

      dueDate: {
        type: Date,
      },

      // =====================================
      // COMPANY DETAILS
      // =====================================

      companyName: {
        type: String,
        default: "NAS TECHNOLOGY",
      },

      companyGST: {
        type: String,
      },

      companyAddress: {
        type: String,
      },

      // =====================================
      // CUSTOMER DETAILS
      // =====================================

      customerName: {
        type: String,
      },

      mobileNumber: {
        type: String,
      },

      address: {
        type: String,
      },

      gstNumber: {
        type: String,
      },

      // =====================================
      // PRODUCT DETAILS
      // =====================================

      items: [
        {
          productName: String,

          description: String,

          quantity: {
            type: Number,
            default: 1,
          },

          rate: {
            type: Number,
            default: 0,
          },

          gst: {
            type: Number,
            default: 0,
          },

          amount: {
            type: Number,
            default: 0,
          },
        },
      ],

      // =====================================
      // AMOUNTS
      // =====================================

      subtotal: {
        type: Number,
        default: 0,
      },

      gstAmount: {
        type: Number,
        default: 0,
      },

      discountAmount: {
        type: Number,
        default: 0,
      },

      grandTotal: {
        type: Number,
        default: 0,
      },

      receivedAmount: {
        type: Number,
        default: 0,
      },

      pendingAmount: {
        type: Number,
        default: 0,
      },

      // =====================================
      // PAYMENT
      // =====================================

      paymentMode: {
        type: String,
        enum: [
          "Cash",
          "UPI",
          "Card",
          "Bank Transfer",
        ],
        default: "Cash",
      },

      paymentStatus: {
        type: String,
        enum: [
          "Pending",
          "Partial",
          "Paid",
        ],
        default: "Pending",
      },

      // =====================================
      // STATUS
      // =====================================

      invoiceStatus: {
        type: String,
        enum: [
          "Draft",
          "Generated",
          "Cancelled",
        ],
        default: "Generated",
      },

      // =====================================
      // REMARKS
      // =====================================

      remarks: {
        type: String,
      },

      signature: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Invoice",
    invoiceSchema
  );