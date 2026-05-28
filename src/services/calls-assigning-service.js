// =====================================
// services/calls-assigning-service.js
// =====================================

const repository = require(
  "../repositories/calls-assigning-repository"
);

// =====================================
// CREATE
// =====================================

const createCallsAssigning = async (
  data
) => {
  return await repository.createCallsAssigning(
    data
  );
};

// =====================================
// GET ALL
// =====================================

const getCallsAssigning =
  async () => {
    return await repository.getCallsAssigning();
  };

// =====================================
// GET BY ID
// =====================================

const getCallAssigning = async (
  id
) => {
  return await repository.getCallAssigning(
    id
  );
};

// =====================================
// UPDATE
// =====================================

const updateCallsAssigning =
  async (id, data) => {
    return await repository.updateCallsAssigning(
      id,
      data
    );
  };

// =====================================
// DELETE
// =====================================

const deleteCallsAssigning =
  async (id) => {
    return await repository.deleteCallsAssigning(
      id
    );
  };

module.exports = {
  createCallsAssigning,
  getCallsAssigning,
  getCallAssigning,
  updateCallsAssigning,
  deleteCallsAssigning,
};