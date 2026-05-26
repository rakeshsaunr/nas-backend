const {
  createCallGeneration,
  getAllCallGenerations,
  getCallGenerationById,
  updateCallGenerationById,
  deleteCallGenerationById,
} = require(
  "../repositories/call-entry-repository"
);

const createCallGenerationService = async (payload) => {
  return createCallGeneration(payload);
};

const getAllCallGenerationsService = async () => {
  return getAllCallGenerations();
};

const getCallGenerationByIdService = async (id) => {
  return getCallGenerationById(id);
};

const updateCallGenerationByIdService = async (id, payload) => {
  return updateCallGenerationById(id, payload);
};

const deleteCallGenerationByIdService = async (id) => {
  return deleteCallGenerationById(id);
};

module.exports = {
  createCallGenerationService,
  getAllCallGenerationsService,
  getCallGenerationByIdService,
  updateCallGenerationByIdService,
  deleteCallGenerationByIdService,
};