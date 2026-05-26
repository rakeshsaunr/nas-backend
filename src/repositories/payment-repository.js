// =====================================
// src/repositories/due-payment-repository.js
// =====================================

const DuePayment =
  require(
    "../models/payment-model"
  );

// CREATE

const createDuePayment =
  async (payload) => {

    return await DuePayment.create(
      payload
    );
  };

// GET ALL

const getAllDuePayments =
  async () => {

    return await DuePayment.find()

      .populate(
        "client",
        "clientName mobileNumber companyName"
      )

      .populate(
        "invoice",
        "invoiceNumber"
      )

      .populate(
        "order",
        "orderId"
      )

      .sort({
        createdAt: -1,
      });
  };

// GET SINGLE

const getDuePaymentById =
  async (id) => {

    return await DuePayment.findById(
      id
    )

      .populate(
        "client",
        "clientName mobileNumber companyName"
      )

      .populate(
        "invoice",
        "invoiceNumber"
      )

      .populate(
        "order",
        "orderId"
      );
  };

// UPDATE

const updateDuePaymentById =
  async (
    id,
    payload
  ) => {

    return await DuePayment.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  };

// DELETE

const deleteDuePaymentById =
  async (id) => {

    return await DuePayment.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createDuePayment,
  getAllDuePayments,
  getDuePaymentById,
  updateDuePaymentById,
  deleteDuePaymentById,
};