const Payment = require("../models/payment-model");
const { 
  createInvoice, 
  getAllInvoices, 
  getInvoiceById, 
  updateInvoiceById, 
  deleteInvoiceById 
} = require("../repositories/invoice-repository"); // ensure these exist

const generateInvoiceNumber = () => {
  const random =
    Math.floor(
      1000 +
      Math.random() * 9000
    );
  return `INV-${new Date().getFullYear()}-${random}`;
};

const createInvoiceService = async (payload) => {
  // Generate invoice number
  payload.invoiceNumber = generateInvoiceNumber();

  // --- Calculations: Subtotal, GST, Grand Total ---
  let subtotal = 0;
  let gstAmount = 0;

  payload.items.forEach((item) => {
    item.amount = item.quantity * item.rate;
    subtotal += item.amount;
    gstAmount += item.amount * (item.gst / 100);
  });

  payload.subtotal = subtotal;
  payload.gstAmount = gstAmount;
  payload.grandTotal =
    subtotal +
    gstAmount -
    Number(payload.discountAmount || 0);

  // --- Received & Pending ---
  const receivedAmount = Number(payload.receivedAmount || 0);
  payload.receivedAmount = receivedAmount;
  payload.pendingAmount = payload.grandTotal - receivedAmount;

  // --- Payment Status for Invoice ---
  if (payload.pendingAmount <= 0) {
    payload.paymentStatus = "Paid";
  } else if (receivedAmount > 0) {
    payload.paymentStatus = "Partial";
  } else {
    payload.paymentStatus = "Pending";
  }

  // --- Save Invoice First ---
  const createdInvoice = await createInvoice(payload);

  // ================================
  // Auto-create Due Payment Entry
  // ================================

  // Due date logic (use invoice due date or today)
  const now = new Date();
  let dueDate = createdInvoice.dueDate ? new Date(createdInvoice.dueDate) : now;

  // Payment Status for Due Payment (Paid/Pending/Overdue)
  let duePaymentStatus;
  if (createdInvoice.pendingAmount <= 0) {
    duePaymentStatus = "Paid";
  } else if (dueDate < now) {
    duePaymentStatus = "Overdue";
  } else {
    duePaymentStatus = "Pending";
  }

  // Auto Payment History
  const paymentHistory = [];
  if (receivedAmount > 0) {
    paymentHistory.push({
      amount: receivedAmount,
      paymentMode: createdInvoice.paymentMode || "N/A",
      date: now,
      remark: "Auto created from invoice",
    });
  }

  // Create Due Payment with full relations and info for frontend
  await Payment.create({
    client: createdInvoice.client, // relation for display
    order: createdInvoice.order,   // relation for display
    invoice: createdInvoice._id,   // relation for display
    totalAmount: createdInvoice.grandTotal,
    receivedAmount: createdInvoice.receivedAmount,
    pendingAmount: createdInvoice.pendingAmount,
    dueDate: dueDate,
    status: duePaymentStatus,
    paymentHistory: paymentHistory, // use correct field for history
    remark: "Auto created from invoice",
  });

  return createdInvoice;
};

// Additional CRUD service functions for proper export
const getAllInvoicesService = async () => {
  return await getAllInvoices();
};

const getInvoiceByIdService = async (id) => {
  return await getInvoiceById(id);
};

const updateInvoiceByIdService = async (id, payload) => {
  return await updateInvoiceById(id, payload);
};

const deleteInvoiceByIdService = async (id) => {
  return await deleteInvoiceById(id);
};

module.exports = {
  createInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
  updateInvoiceByIdService,
  deleteInvoiceByIdService,
};