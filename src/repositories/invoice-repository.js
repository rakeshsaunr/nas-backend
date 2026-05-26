// =====================================
// src/repositories/invoice-repository.js
// =====================================

const Invoice = require(
  "../models/invoice-model"
);

// CREATE
const createInvoice =
  async (payload) => {

    return await Invoice.create(
      payload
    );
  };

// GET ALL
const getAllInvoices =
  async () => {

    return await Invoice.find({})

      .populate(
        "client"
      )

      .populate(
        "order"
      )

      .sort({
        createdAt: -1,
      });
  };

// GET SINGLE
const getInvoiceById =
  async (id) => {

    return await Invoice.findById(
      id
    )

      .populate(
        "client"
      )

      .populate(
        "order"
      );
  };

// UPDATE
const updateInvoiceById =
  async (
    id,
    payload
  ) => {

    return await Invoice.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  };

// DELETE
const deleteInvoiceById =
  async (id) => {

    return await Invoice.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
};