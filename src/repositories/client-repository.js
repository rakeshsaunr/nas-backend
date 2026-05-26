// =====================================
// src/repositories/client-repository.js
// =====================================

const Client = require(
  "../models/client-model"
);

const Order = require(
  "../models/order-model"
);

const Invoice = require(
  "../models/invoice-model"
);

const mongoose = require(
  "mongoose"
);

// =====================================
// CREATE CLIENT
// =====================================

const createClient =
  async (payload) => {

    try {

      const existingClient =
        await Client.findOne({
          mobileNumber:
            payload.mobileNumber,
        });

      if (existingClient) {

        throw new Error(
          "Client already exists with this mobile number"
        );
      }

      return await Client.create(
        payload
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to create client"
      );
    }
  };

// =====================================
// GET ALL CLIENTS
// =====================================

const getAllClients =
  async (query = {}) => {

    try {

      const search =
        query.search || "";

      return await Client.find({
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
      }).sort({
        createdAt: -1,
      });

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to retrieve clients"
      );
    }
  };

// =====================================
// GET CLIENT BY ID
// =====================================

const getClientById =
  async (id) => {

    try {

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {

        throw new Error(
          "Invalid client ID"
        );
      }

      const client =
        await Client.findById(id);

      if (!client) {

        throw new Error(
          "Client not found"
        );
      }

      // ORDERS

      const orders =
        await Order.find({
          client: id,
        }).sort({
          createdAt: -1,
        });

      // INVOICES

      const invoices =
        await Invoice.find({
          client: id,
        }).sort({
          createdAt: -1,
        });

      // TOTAL BUSINESS

      const totalBusiness =
        invoices.reduce(
          (sum, item) =>
            sum +
            (item.grandTotal || 0),
          0
        );

      // TOTAL PAID

      const totalPaid =
        invoices.reduce(
          (sum, item) =>
            sum +
            (item.receivedAmount ||
              0),
          0
        );

      // PENDING

      const pendingAmount =
        invoices.reduce(
          (sum, item) =>
            sum +
            (item.pendingAmount ||
              0),
          0
        );

      return {
        client,
        orders,
        invoices,
        totalBusiness,
        totalPaid,
        pendingAmount,
      };

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to retrieve client"
      );
    }
  };

// =====================================
// UPDATE CLIENT
// =====================================

const updateClientById =
  async (
    id,
    payload
  ) => {

    try {

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {

        throw new Error(
          "Invalid client ID"
        );
      }

      const updatedClient =
        await Client.findByIdAndUpdate(
          id,
          payload,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedClient) {

        throw new Error(
          "Client not found"
        );
      }

      return updatedClient;

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to update client"
      );
    }
  };

// =====================================
// DELETE CLIENT
// =====================================

const deleteClientById =
  async (id) => {

    try {

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {

        throw new Error(
          "Invalid client ID"
        );
      }

      const deletedClient =
        await Client.findByIdAndDelete(
          id
        );

      if (!deletedClient) {

        throw new Error(
          "Client not found"
        );
      }

      return deletedClient;

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to delete client"
      );
    }
  };

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};