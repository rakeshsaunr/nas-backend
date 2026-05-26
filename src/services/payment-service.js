// =====================================
// src/services/due-payment-service.js
// =====================================

const {
  createDuePayment,
  getAllDuePayments,
  getDuePaymentById,
  updateDuePaymentById,
  deleteDuePaymentById,
} = require(
  "../repositories/payment-repository"
);

// CREATE

const createDuePaymentService =
  async (payload) => {

    const {
      totalAmount,
      receivedAmount,
      dueDate,
    } = payload;

    if (!totalAmount) {

      throw new Error(
        "Total amount is required"
      );
    }

    const pendingAmount =
      totalAmount -
      (receivedAmount || 0);

    let status =
      "Pending";

    if (
      pendingAmount <= 0
    ) {

      status = "Paid";
    }

    if (
      pendingAmount > 0 &&
      dueDate &&
      new Date(dueDate) <
        new Date()
    ) {

      status = "Overdue";
    }

    const cleanPayload = {

      ...payload,

      pendingAmount,

      status,
    };

    return await createDuePayment(
      cleanPayload
    );
  };

// GET ALL

const getAllDuePaymentsService =
  async () => {

    return await getAllDuePayments();
  };

// GET SINGLE

const getDuePaymentByIdService =
  async (id) => {

    return await getDuePaymentById(
      id
    );
  };

// UPDATE

const updateDuePaymentByIdService =
  async (
    id,
    payload
  ) => {

    const totalAmount =
      payload.totalAmount || 0;

    const receivedAmount =
      payload.receivedAmount || 0;

    const pendingAmount =
      totalAmount -
      receivedAmount;

    let status =
      "Pending";

    if (
      pendingAmount <= 0
    ) {

      status = "Paid";
    }

    if (
      pendingAmount > 0 &&
      payload.dueDate &&
      new Date(
        payload.dueDate
      ) < new Date()
    ) {

      status = "Overdue";
    }

    return await updateDuePaymentById(
      id,
      {
        ...payload,
        pendingAmount,
        status,
      }
    );
  };

// DELETE

const deleteDuePaymentByIdService =
  async (id) => {

    return await deleteDuePaymentById(
      id
    );
  };

module.exports = {
  createDuePaymentService,
  getAllDuePaymentsService,
  getDuePaymentByIdService,
  updateDuePaymentByIdService,
  deleteDuePaymentByIdService,
};