// =====================================
// src/controllers/due-payment-controller.js
// =====================================

const {
  createDuePaymentService,
  getAllDuePaymentsService,
  getDuePaymentByIdService,
  updateDuePaymentByIdService,
  deleteDuePaymentByIdService,
} = require(
  "../services/payment-service"
);

// CREATE

const createDuePayment =
  async (req, res) => {

    try {

      const data =
        await createDuePaymentService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Due payment created successfully",
        data,
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET ALL

const getAllDuePayments =
  async (req, res) => {

    try {

      const data =
        await getAllDuePaymentsService();

      return res.status(200).json({
        success: true,
        total:
          data.length,
        data,
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

const getDuePaymentById =
  async (req, res) => {

    try {

      const data =
        await getDuePaymentByIdService(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data,
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

const updateDuePaymentById =
  async (req, res) => {

    try {

      const data =
        await updateDuePaymentByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Due payment updated successfully",
        data,
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// DELETE

const deleteDuePaymentById =
  async (req, res) => {

    try {

      await deleteDuePaymentByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Due payment deleted successfully",
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
  createDuePayment,
  getAllDuePayments,
  getDuePaymentById,
  updateDuePaymentById,
  deleteDuePaymentById,
};