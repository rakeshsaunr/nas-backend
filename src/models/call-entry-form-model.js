const mongoose = require("mongoose");

const callEntrySchema = new mongoose.Schema(
  {
    // =====================================
    // AUTO CALL NUMBER
    // =====================================

    callNo: {
      type: String,
      unique: true,
      sparse: true, // To prevent index creation error before value is set
    },

    srNo: {
      type: Number,
      unique: true,
      sparse: true,
    },

    // =====================================
    // CALL DATE & TIME
    // =====================================

    callDate: {
      type: Date,
      default: Date.now,
    },

    callTime: {
      type: String,
      trim: true,
    },

    // =====================================
    // CUSTOMER DETAILS
    // =====================================

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerMaster",
      required: true,
    },

    customerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerTypeMaster",
      required: true,
    },

    endUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EndUserMaster",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    callLoggedBy: {
      type: String,
      trim: true,
    },

    warrantyInformation: {
      type: String,
      trim: true,
    },

    // =====================================
    // CALL DETAILS
    // =====================================

    callType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallMaster",
      required: true,
    },

    chargeAmount: {
      type: Number,
      default: 0,
    },

    natureOfCall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallNatureMaster",
    },

    instrument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstrumentMaster",
    },

    problemDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },

    preferredDate: {
      type: Date,
    },

    preferredTimings: {
      type: String,
      trim: true,
    },

    callAttempt: {
      type: Number,
      default: 1,
    },

    // =====================================
    // ENGINEER ASSIGNED -> now EmployeeMaster reference
    // =====================================

    engineerAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeMaster",
    },

    assignedDate: {
      type: Date,
    },

    assignRemark: {
      type: String,
      trim: true,
    },

    callStatus: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Hold",
        "Completed",
        "Closed",
      ],
      default: "Pending",
    },

    callUrgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallUrgency",
    },

    // =====================================
    // CALL NOTED BY
    // =====================================

    callNotedBy: {
      type: String,
      trim: true,
    },

    // =====================================
    // CLOUDINARY FILES -- Only ATTACHMENT (NO audio)
    // =====================================

    attachment: {
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

// =====================================
// AUTO GENERATE CALL NUMBER
// =====================================

// Ensure atomic and safe assignment of callNo and srNo in concurrent environments
callEntrySchema.pre("save", async function (next) {
  try {
    // Only generate if both are missing (for new documents)
    if (!this.callNo || !this.srNo) {
      const Counter = mongoose.connection.collection("callentrycounters");
      const counter = await Counter.findOneAndUpdate(
        { _id: "callEntry" },
        { $inc: { seq: 1 } },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      let srNo;
      // Counter result format may depend on MongoDB driver version
      if (counter && counter.value && typeof counter.value.seq === "number") {
        srNo = counter.value.seq;
      } else if (counter && typeof counter.seq === "number") {
        srNo = counter.seq;
      } else {
        return next(new Error("Failed to generate auto-increment srNo for Call Entry."));
      }
      this.srNo = srNo;
      this.callNo = `CALL-${String(srNo).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CallEntry =
  mongoose.models.CallEntry ||
  mongoose.model("CallEntry", callEntrySchema);

module.exports = CallEntry;