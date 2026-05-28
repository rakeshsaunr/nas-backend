const Blog = require('./blog-model');
const Contact = require('./contact-model');
const OTP = require('./otp-model');
const Stats = require('./stats-model');
const Callslip = require('./callslip-model');
const Servicecall = require('./servicecall-model');
const Category = require('./category-model');
const ExpenseCategory = require('./expense-category-model');
const Expense = require('./expense-model');
const Department = require('./department-model');
const DivisionMaster = require('./division-master-model'); // Added division-master model
const Customer = require('./customer-master-model');
const CustomerTypeMaster = require('./customer-type-master-model'); // Added customer-type-master model
const Income = require('./income-model');
const Invoice = require('./invoice-model');
const Client = require('./client-model');
const Payment = require('./payment-model');
const Order = require('./order-model');
const Employee = require('./employee-master-model'); // Added employee model
const Enquiry = require('./enquiry-model'); // Added enquiry model
const Report = require('./report-model'); // Added report model
const CallEntryForm = require('./call-entry-form-model'); // Added call-entry-form model
const StatusMaster = require('./status-master-model'); // Added status-master model
const CallMaster = require('./call-master-model'); // Added call-master model
const CallTypeMaster = require('./call-type-master-model'); // Added call-type-master model
const VenderMaster = require('./vender-master-model'); // Added vender-master model
const CallUrgency = require('./call-urgency-model'); // Added call-urgency model
const Problem = require('./problem-model'); // Added problem model
const ItemTypeMaster = require('./item-type-master-model'); // Added item-type-master model
const SupportPeriodMaster = require('./support-period-master-model'); // Added support-period-master model
const DesignationMaster = require('./designation-master-model'); // Added designation-master model
const EndUserMaster = require('./end-user-master-model'); // Added end-user-master model
const InstrumentMaster = require('./instrument-master-model'); // Added instrument-master model
const DailyCallSheet = require('./daily-call-sheet-model'); // Added daily-call-sheet model
const TechnicianMaster = require('./technician-master-model'); // Added technician-master model
const CallsAssigning = require('./calls-assigning-model'); // Added calls-assigning model

module.exports = {
  Blog,
  Contact,
  OTP,
  Stats,
  Callslip,
  Servicecall,
  Category,
  ExpenseCategory,
  Expense,
  Department,
  DivisionMaster, // Exported division-master model
  Customer,
  CustomerTypeMaster, // Exported customer-type-master model
  Income,
  Invoice,
  Client,
  Payment,
  Order,
  Employee, // Exported employee model
  Enquiry, // Exported enquiry model
  Report, // Exported report model
  CallEntryForm, // Exported call-entry-form model
  StatusMaster, // Exported status-master model
  CallMaster, // Exported call-master model
  CallTypeMaster, // Exported call-type-master model
  VenderMaster, // Exported vender-master model
  CallUrgency, // Exported call-urgency model
  Problem, // Exported problem model
  ItemTypeMaster, // Exported item-type-master model
  SupportPeriodMaster, // Exported support-period-master model
  DesignationMaster, // Exported designation-master model
  EndUserMaster, // Exported end-user-master model
  InstrumentMaster, // Exported instrument-master model
  DailyCallSheet, // Exported daily-call-sheet model
  TechnicianMaster, // Exported technician-master model
  CallsAssigning, // Exported calls-assigning model
};
