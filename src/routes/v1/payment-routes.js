// =====================================
// src/routes/v1/due-payment-routes.js
// =====================================

const express =
  require("express");

const router =
  express.Router();

const {
  createDuePayment,
  getAllDuePayments,
  getDuePaymentById,
  updateDuePaymentById,
  deleteDuePaymentById,
} = require(
  "../../controllers/payment-controller"
);

// CREATE
router.post(
  "/",
  createDuePayment
);

// GET ALL
router.get(
  "/",
  getAllDuePayments
);

// GET SINGLE
router.get(
  "/:id",
  getDuePaymentById
);

// UPDATE
router.put(
  "/:id",
  updateDuePaymentById
);

// DELETE
router.delete(
  "/:id",
  deleteDuePaymentById
);

module.exports = router;