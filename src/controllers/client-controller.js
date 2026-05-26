const mongoose = require("mongoose");

const Client = require("../models/client-model");

// =====================================
// CREATE CLIENT
// =====================================
const createClient = async (req, res) => {
  try {
    const {
      clientName,
      mobileNumber,
      address,
      gstNumber,
      companyName,
      previousDue,
      totalBusiness,
      lastServiceDate,
    } = req.body;

    // VALIDATION
    if (!clientName || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Client name and mobile number are required",
      });
    }

    // CHECK EXISTING CLIENT
    const existingClient = await Client.findOne({
      mobileNumber,
    });

    if (existingClient) {
      return res.status(409).json({
        success: false,
        message:
          "Client already exists with this mobile number",
      });
    }

    // CREATE CLIENT
    const client = await Client.create({
      clientName: clientName.trim(),
      mobileNumber: mobileNumber.trim(),
      address: address?.trim() || "",
      gstNumber:
        gstNumber?.trim().toUpperCase() || "",
      companyName: companyName?.trim() || "",
      previousDue: previousDue || 0,
      totalBusiness: totalBusiness || 0,
      lastServiceDate: lastServiceDate || null,
    });

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create client",
    });
  }
};

// =====================================
// GET ALL CLIENTS
// =====================================
const getAllClients = async (req, res) => {
  try {
    const search = req.query.search || "";

    const clients = await Client.find({
      $or: [
        {
          clientName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mobileNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: clients.length,
      data: clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch clients",
    });
  }
};

// =====================================
// GET SINGLE CLIENT
// =====================================
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDATE OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch client",
    });
  }
};

// =====================================
// UPDATE CLIENT
// =====================================
const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDATE OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update client",
    });
  }
};

// =====================================
// DELETE CLIENT
// =====================================
const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDATE OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID",
      });
    }

    const deletedClient =
      await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete client",
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};