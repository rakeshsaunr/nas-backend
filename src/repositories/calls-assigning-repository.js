// =====================================
// repositories/calls-assigning-repository.js
// =====================================

const CallsAssigning = require(
  "../models/calls-assigning-model"
);

// =====================================
// CREATE
// =====================================

const createCallsAssigning =
  async (data) => {
    return CallsAssigning.create(data);
  };

// =====================================
// GET ALL
// =====================================

const getCallsAssigning =
  async () => {
    return CallsAssigning.find()

      .populate(
        "department",
        "departmentName"
      )

      .populate(
        "callType",
        "callType"
      )

      .populate(
        "natureOfCall",
        "callNatureName natureOfCall callNature"
      )

      .populate(
        "instrument",
        "instrumentName"
      )

      .populate(
        "problem",
        "problemName"
      )

      // =====================================
      // CUSTOMER
      // =====================================

      .populate(
        "customer",
        "name"
      )

      // =====================================
      // END USER
      // =====================================

      .populate(
        "endUser",
        "endUserName name"
      )

      // =====================================
      // EMPLOYEE
      // =====================================

      .populate(
        "employee",
        "employeeName"
      )

      // =====================================
      // DESIGNATION
      // =====================================

      .populate(
        "designation",
        "designationName"
      )

      // =====================================
      // STATUS
      // =====================================

      .populate(
        "status",
        "statusName"
      )

      // =====================================
      // PRIORITY
      // =====================================

      .populate(
        "priority",
        "urgencyType urgencyLevel name"
      )

      // =====================================
      // CALL NO
      // =====================================

      .populate(
        "callNo",
        "callNo"
      )

      .sort({
        createdAt: -1,
      });
  };

// =====================================
// GET SINGLE
// =====================================

const getCallAssigning =
  async (id) => {
    return CallsAssigning.findById(id)

      .populate(
        "department",
        "departmentName"
      )

      .populate(
        "callType",
        "callType"
      )

      .populate(
        "natureOfCall",
        "callNatureName natureOfCall callNature"
      )

      .populate(
        "instrument",
        "instrumentName"
      )

      .populate(
        "problem",
        "problemName"
      )

      // =====================================
      // CUSTOMER
      // =====================================

      .populate(
        "customer",
        "name"
      )

      // =====================================
      // END USER
      // =====================================

      .populate(
        "endUser",
        "endUserName name"
      )

      // =====================================
      // EMPLOYEE
      // =====================================

      .populate(
        "employee",
        "employeeName"
      )

      // =====================================
      // DESIGNATION
      // =====================================

      .populate(
        "designation",
        "designationName"
      )

      // =====================================
      // STATUS
      // =====================================

      .populate(
        "status",
        "statusName"
      )

      // =====================================
      // PRIORITY
      // =====================================

      .populate(
        "priority",
        "urgencyType urgencyLevel name"
      )

      // =====================================
      // CALL NO
      // =====================================

      .populate(
        "callNo",
        "callNo"
      );
  };

// =====================================
// UPDATE
// =====================================

const updateCallsAssigning =
  async (id, data) => {
    return CallsAssigning.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    )

      .populate(
        "department",
        "departmentName"
      )

      .populate(
        "callType",
        "callType"
      )

      .populate(
        "natureOfCall",
        "callNatureName natureOfCall callNature"
      )

      .populate(
        "instrument",
        "instrumentName"
      )

      .populate(
        "problem",
        "problemName"
      )

      // =====================================
      // CUSTOMER
      // =====================================

      .populate(
        "customer",
        "name"
      )

      // =====================================
      // END USER
      // =====================================

      .populate(
        "endUser",
        "endUserName name"
      )

      // =====================================
      // EMPLOYEE
      // =====================================

      .populate(
        "employee",
        "employeeName"
      )

      // =====================================
      // DESIGNATION
      // =====================================

      .populate(
        "designation",
        "designationName"
      )

      // =====================================
      // STATUS
      // =====================================

      .populate(
        "status",
        "statusName"
      )

      // =====================================
      // PRIORITY
      // =====================================

      .populate(
        "priority",
        "urgencyType urgencyLevel name"
      )

      // =====================================
      // CALL NO
      // =====================================

      .populate(
        "callNo",
        "callNo"
      );
  };

// =====================================
// DELETE
// =====================================

const deleteCallsAssigning =
  async (id) => {
    return CallsAssigning.findByIdAndDelete(
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