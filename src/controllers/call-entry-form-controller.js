const mongoose = require("mongoose");
const CallEntry = require("../models/call-entry-form-model");

// CREATE
const createCallEntryController = async (req, res) => {
  try {
    const {
      customer,
      customerType,
      callType,
      // rest optional fields from schema, if sent
    } = req.body;

    if (
      !customer ||
      !customerType ||
      !callType ||
      !mongoose.Types.ObjectId.isValid(customer) ||
      !mongoose.Types.ObjectId.isValid(customerType) ||
      !mongoose.Types.ObjectId.isValid(callType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "customer, customerType, and callType are required and must be valid IDs.",
      });
    }

    // Create the call entry
    const data = await CallEntry.create(req.body);

    // Repopulate the record to send all populated fields back
    const populatedData = await CallEntry.findById(data._id)
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency");

    return res.status(201).json({
      success: true,
      message: "Call Entry created successfully",
      data: populatedData,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate call number or serial number.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
const getAllCallEntriesController = async (req, res) => {
  try {
    const data = await CallEntry.find()
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: Array.isArray(data) ? data.length : 0,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
const getCallEntryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const data = await CallEntry.findById(id)
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCallEntryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    // Update and return the populated document
    const data = await CallEntry.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCallEntryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const data = await CallEntry.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCallEntry: createCallEntryController,
  getAllCallEntries: getAllCallEntriesController,
  getCallEntryById: getCallEntryByIdController,
  updateCallEntry: updateCallEntryController,
  deleteCallEntry: deleteCallEntryController,
};