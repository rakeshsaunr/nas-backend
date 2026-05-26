// =====================================
// src/services/client-service.js
// =====================================

const {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require(
  "../repositories/client-repository"
);

// =====================================
// CREATE CLIENT SERVICE
// =====================================

const createClientService =
  async (payload) => {

    try {

      const {
        clientName,
        mobileNumber,
        address,
        gstNumber,
        companyName,
        previousDue,
        totalBusiness,
        totalPaid,
        pendingAmount,
        lastServiceDate,
        notes,
        status,
      } = payload;

      // VALIDATION

      if (
        !clientName ||
        !mobileNumber
      ) {

        throw new Error(
          "Client name and mobile number are required"
        );
      }

      // CLEAN DATA

      const clientData = {
        clientName:
          clientName.trim(),

        mobileNumber:
          mobileNumber.trim(),

        address:
          address?.trim() || "",

        gstNumber:
          gstNumber
            ?.trim()
            .toUpperCase() || "",

        companyName:
          companyName?.trim() ||
          "",

        previousDue:
          previousDue || 0,

        totalBusiness:
          totalBusiness || 0,

        totalPaid:
          totalPaid || 0,

        pendingAmount:
          pendingAmount || 0,

        lastServiceDate:
          lastServiceDate || null,

        notes:
          notes || "",

        status:
          status || "Active",
      };

      return await createClient(
        clientData
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to create client"
      );
    }
  };

// =====================================
// GET ALL CLIENTS SERVICE
// =====================================

const getAllClientsService =
  async (query) => {

    try {

      return await getAllClients(
        query
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to fetch clients"
      );
    }
  };

// =====================================
// GET SINGLE CLIENT SERVICE
// =====================================

const getClientByIdService =
  async (id) => {

    try {

      if (!id) {

        throw new Error(
          "Client ID is required"
        );
      }

      return await getClientById(
        id
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to fetch client"
      );
    }
  };

// =====================================
// UPDATE CLIENT SERVICE
// =====================================

const updateClientByIdService =
  async (
    id,
    payload
  ) => {

    try {

      if (!id) {

        throw new Error(
          "Client ID is required"
        );
      }

      const updatedPayload = {
        ...payload,
      };

      if (
        updatedPayload.clientName
      ) {

        updatedPayload.clientName =
          updatedPayload.clientName.trim();
      }

      if (
        updatedPayload.mobileNumber
      ) {

        updatedPayload.mobileNumber =
          updatedPayload.mobileNumber.trim();
      }

      if (
        updatedPayload.address
      ) {

        updatedPayload.address =
          updatedPayload.address.trim();
      }

      if (
        updatedPayload.companyName
      ) {

        updatedPayload.companyName =
          updatedPayload.companyName.trim();
      }

      if (
        updatedPayload.gstNumber
      ) {

        updatedPayload.gstNumber =
          updatedPayload.gstNumber
            .trim()
            .toUpperCase();
      }

      return await updateClientById(
        id,
        updatedPayload
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to update client"
      );
    }
  };

// =====================================
// DELETE CLIENT SERVICE
// =====================================

const deleteClientByIdService =
  async (id) => {

    try {

      if (!id) {

        throw new Error(
          "Client ID is required"
        );
      }

      return await deleteClientById(
        id
      );

    } catch (error) {

      throw new Error(
        error.message ||
          "Failed to delete client"
      );
    }
  };

module.exports = {
  createClientService,
  getAllClientsService,
  getClientByIdService,
  updateClientByIdService,
  deleteClientByIdService,
};