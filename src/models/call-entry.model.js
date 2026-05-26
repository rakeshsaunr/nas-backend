const mongoose = require("mongoose");

const callGenerationSchema =
  new mongoose.Schema(
    {
      // =====================================
      // CUSTOMER DETAILS
      // =====================================
      company: {
        type: String,
        required: true,
        trim: true,
      },

      endUserName: {
        type: String,
        trim: true,
      },

      // =====================================
      // CALL NUMBER
      // =====================================
      callNumber: {
        type: String,
        unique: true,
      },

      // =====================================
      // DATE & TIME (MANUAL FROM FRONTEND)
      // =====================================
      callDate: {
        type: Date,
        required: true,
      },

      callTime: {
        type: String,
        required: true,
      },

      // =====================================
      // PRODUCT
      // =====================================
      product: {
        type: String,
        enum: [
          "CCTV",
          "TA/AC",
          "PC/NW",
          "EPABX",
          "Others",
        ],
        required: true,
      },

      // =====================================
      // CALL TYPE
      // =====================================
      callType: {
        type: String,
        enum: [
          "Warranty",
          "Chargeable",
          "FOC",
          "Inhouse",
          "Site Survey",
        ],
        required: true,
      },

      // =====================================
      // NATURE
      // =====================================
      nature: {
        type: String,
        enum: [
          "Breakdown",
          "Proactive",
          "Preventive",
          "Courtesy",
          "Demo",
        ],
        required: true,
      },

      // =====================================
      // CALL DETAILS
      // =====================================
      callDetails: {
        type: String,
        trim: true,
      },

      // =====================================
      // CALL LOGGING INFO
      // =====================================
      notedBy: {
        type: String,
        trim: true,
      },

      receivedBy: {
        type: String,
        enum: ["KS", "VB"],
        required: true,
      },

      auditedBy: {
        type: String,
        trim: true,
      },

      sign: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

// =====================================
// AUTO GENERATE CALL NUMBER
// =====================================
callGenerationSchema.pre(
  "save",
  async function (next) {
    try {
      const total =
        await mongoose
          .model("CallGeneration")
          .countDocuments();

      if (
        !this.callNumber ||
        this.callNumber === ""
      ) {
        this.callNumber = `CG-${String(
          total + 1
        ).padStart(5, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const CallGeneration =
  mongoose.models.CallGeneration ||
  mongoose.model(
    "CallGeneration",
    callGenerationSchema
  );

module.exports = CallGeneration;