// =====================================
// src/routes/v1/invoice-routes.js
// =====================================

const express = require(
  "express"
);

const router =
  express.Router();

const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
} = require(
  "../../controllers/invoice-controller"
);

// CREATE
router.post(
  "/",
  createInvoice
);

// GET ALL
router.get(
  "/",
  getAllInvoices
);

// GET SINGLE
router.get(
  "/:id",
  getInvoiceById
);

// UPDATE
router.put(
  "/:id",
  updateInvoiceById
);

// DELETE
router.delete(
  "/:id",
  deleteInvoiceById
);

module.exports = router;