const CallEntry = require("../models/call-entry-form-model");

// CallEntry Populate configuration (please keep in sync with the reference fields and their display fields in the model!)
const CALL_ENTRY_POPULATES = [
  { path: "customer", select: "customerName city phone1 email" },
  { path: "customerType", select: "customerTypeName customerTypeCode" },
  { path: "endUser", select: "endUserName endUserCode" },
  { path: "department", select: "departmentName departmentCode" },
  { path: "callType", select: "callType callTypeCode" },
  { path: "natureOfCall", select: "callNatureName callNatureCode" },
  { path: "instrument", select: "instrumentName instrumentCode" },
  { path: "problemDetails", select: "problemName problemCode" },
  { path: "callUrgency", select: "urgencyType" },
];

// Helper: Apply all required populates to a mongoose query
const applyPopulates = (query) => {
  CALL_ENTRY_POPULATES.forEach((pop) => {
    query = query.populate(pop);
  });
  return query;
};

// CREATE (atomic, triggers pre-save logic in model, always populate)
const createCallEntryService = async (data) => {
  try {
    const entry = new CallEntry(data);
    await entry.save();
    // Fetch the saved doc with all populates
    return await CallEntry.findById(entry._id).populate(CALL_ENTRY_POPULATES);
  } catch (err) {
    throw err;
  }
};

// GET ALL (descending by createdAt, fully populated)
const getAllCallEntriesService = async () => {
  try {
    let query = CallEntry.find();
    query = applyPopulates(query);
    query = query.sort({ createdAt: -1 });
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// GET SINGLE by ID (fully populated)
const getCallEntryByIdService = async (id) => {
  try {
    let query = CallEntry.findById(id);
    query = applyPopulates(query);
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// UPDATE by ID (return updated & fully populated)
const updateCallEntryByIdService = async (id, data) => {
  try {
    let query = CallEntry.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    query = applyPopulates(query);
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// DELETE by ID
const deleteCallEntryByIdService = async (id) => {
  try {
    return await CallEntry.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCallEntryService,
  getAllCallEntriesService,
  getCallEntryByIdService,
  updateCallEntryByIdService,
  deleteCallEntryByIdService,
};