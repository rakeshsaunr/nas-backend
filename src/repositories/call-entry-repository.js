const CallGeneration = require(
  "../models/call-entry.model"
);

// CREATE
const createCallGeneration = async (
  payload
) => {
  return await CallGeneration.create(
    payload
  );
};

// GET ALL
const getAllCallGenerations =
  async () => {
    return await CallGeneration.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCallGenerationById =
  async (id) => {
    return await CallGeneration.findById(
      id
    ).lean();
  };

// UPDATE
const updateCallGenerationById =
  async (id, payload) => {
    return await CallGeneration.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCallGenerationById =
  async (id) => {
    return await CallGeneration.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCallGeneration,
  getAllCallGenerations,
  getCallGenerationById,
  updateCallGenerationById,
  deleteCallGenerationById,
};