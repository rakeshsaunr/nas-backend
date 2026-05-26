const mongoose =
  require("mongoose");

const paymentHistorySchema =
  new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
      },

      paymentDate: {
        type: Date,
        default: Date.now,
      },

      paymentMode: {
        type: String,
        enum: [
          "Cash",
          "UPI",
          "Bank Transfer",
          "Card",
        ],
        default: "Cash",
      },

      remark: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const duePaymentSchema =
  new mongoose.Schema(
    {
      client: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },

      invoice: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },

      order: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      receivedAmount: {
        type: Number,
        default: 0,
      },

      pendingAmount: {
        type: Number,
        default: 0,
      },

      dueDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "Paid",
          "Pending",
          "Overdue",
        ],
        default: "Pending",
      },

      paymentHistory: [
        paymentHistorySchema,
      ],

      remark: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "DuePayment",
    duePaymentSchema
  );