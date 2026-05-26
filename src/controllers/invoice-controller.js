// =====================================
// src/controllers/invoice-controller.js
// =====================================

const mongoose = require(
  "mongoose"
);

const {
  createInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
  updateInvoiceByIdService,
  deleteInvoiceByIdService,
} = require(
  "../services/invoice-service"
);

// CREATE
const createInvoice =
  async (req, res) => {
    try {

      const invoice =
        await createInvoiceService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Invoice created successfully",
        data: invoice,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET ALL
const getAllInvoices =
  async (req, res) => {
    try {

      const invoices =
        await getAllInvoicesService();

      return res.status(200).json({
        success: true,
        total:
          invoices.length,
        data: invoices,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET SINGLE
const getInvoiceById =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid invoice ID",
        });
      }

      const invoice =
        await getInvoiceByIdService(
          id
        );

      if (!invoice) {

        return res.status(404).json({
          success: false,
          message:
            "Invoice not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: invoice,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// UPDATE
const updateInvoiceById =
  async (req, res) => {
    try {

      const invoice =
        await updateInvoiceByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Invoice updated successfully",
        data: invoice,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// DELETE
const deleteInvoiceById =
  async (req, res) => {
    try {

      await deleteInvoiceByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Invoice deleted successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
};