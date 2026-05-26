const mongoose = require("mongoose");

const {
  createCallGenerationService,
  getAllCallGenerationsService,
  getCallGenerationByIdService,
  updateCallGenerationByIdService,
  deleteCallGenerationByIdService,
} = require(
  "../services/call-entry-service"
);

// CREATE
const createCallGeneration =
  async (req, res) => {
    try {
      const data =
        await createCallGenerationService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Call Generation created successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL
const getAllCallGenerations =
  async (req, res) => {
    try {
      const data =
        await getAllCallGenerationsService();

      return res.status(200).json({
        success: true,
        total: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET SINGLE
const getCallGenerationById =
  async (req, res) => {
    try {
      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID",
        });
      }

      const data =
        await getCallGenerationByIdService(
          id
        );

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE
const updateCallGenerationById =
  async (req, res) => {
    try {
      const { id } = req.params;

      const data =
        await updateCallGenerationByIdService(
          id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Updated successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE
const deleteCallGenerationById =
  async (req, res) => {
    try {
      const { id } = req.params;

      await deleteCallGenerationByIdService(
        id
      );

      return res.status(200).json({
        success: true,
        message:
          "Deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createCallGeneration,
  getAllCallGenerations,
  getCallGenerationById,
  updateCallGenerationById,
  deleteCallGenerationById,
};