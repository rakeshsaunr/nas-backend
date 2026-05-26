// =====================================
// src/routes/v1/client-routes.js
// =====================================

const express = require(
  "express"
);

const router =
  express.Router();

const {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require(
  "../../controllers/client-controller"
);

// =====================================
// CLIENT ROUTES
// =====================================

// GET ALL CLIENTS
router.get(
  "/",
  getAllClients
);

// CLIENT HISTORY
router.get(
  "/:id/history",
  getClientById
);

// GET SINGLE CLIENT
router.get(
  "/:id",
  getClientById
);

// CREATE CLIENT
router.post(
  "/",
  createClient
);

// UPDATE CLIENT
router.put(
  "/:id",
  updateClientById
);

// DELETE CLIENT
router.delete(
  "/:id",
  deleteClientById
);

module.exports = router;