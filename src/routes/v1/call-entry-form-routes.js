const express = require("express");

const router = express.Router();

const {
  createCallEntry,
  getAllCallEntries,
  getCallEntryById,
  updateCallEntry,
  deleteCallEntry,
} = require("../../controllers/call-entry-form-controller");

// CREATE
router.post("/", createCallEntry);

// GET ALL
router.get("/", getAllCallEntries);

// GET SINGLE
router.get("/:id", getCallEntryById);

// UPDATE
router.put("/:id", updateCallEntry);

// DELETE
router.delete("/:id", deleteCallEntry);

module.exports = router;