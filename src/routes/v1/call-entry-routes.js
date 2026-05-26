const express = require("express");

const router = express.Router();

const {
  createCallGeneration,
  getAllCallGenerations,
  getCallGenerationById,
  updateCallGenerationById,
  deleteCallGenerationById,
} = require(
  "../../controllers/call-entry-controller"
);

// CREATE
router.post(
  "/",
  createCallGeneration
);

// GET ALL
router.get(
  "/",
  getAllCallGenerations
);

// GET SINGLE
router.get(
  "/:id",
  getCallGenerationById
);

// UPDATE
router.put(
  "/:id",
  updateCallGenerationById
);

// DELETE
router.delete(
  "/:id",
  deleteCallGenerationById
);

module.exports = router;