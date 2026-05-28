// =====================================
// repositories/daily-calls-sheet-repository.js
// =====================================

const DailyCallSheet =
  require(
    "../models/daily-calls-sheet-model"
  );

// =====================================
// CREATE
// =====================================

const createDailyCallSheet =
  async (data) => {

    return await DailyCallSheet.create(
      data
    );
  };

// =====================================
// GET ALL
// =====================================

const getAllDailyCallSheets =
  async () => {

    return await DailyCallSheet.find()

      // =====================================
      // CALL ENTRY
      // =====================================

      .populate({

        path: "callEntry",

        select:
          "callNo callDate callAttempt preferredTimings",
      })

      // =====================================
      // CUSTOMER
      // =====================================

      .populate({

        path: "customer",

        select:
          "customerName mobileNumber companyName",
      })

      // =====================================
      // TECHNICIAN
      // =====================================

      .populate({

        path:
          "technicianAssigned",

        select:
          "employeeName mobileNumber",
      })

      // =====================================
      // STATUS
      // =====================================

      .populate({

        path: "status",

        select:
          "statusName",
      })

      .sort({
        createdAt: -1,
      });
  };

// =====================================
// GET SINGLE
// =====================================

const getSingleDailyCallSheet =
  async (id) => {

    return await DailyCallSheet.findById(
      id
    )

      .populate({

        path: "callEntry",

        select:
          "callNo callDate callAttempt preferredTimings",
      })

      .populate({

        path: "customer",

        select:
          "customerName mobileNumber companyName",
      })

      .populate({

        path:
          "technicianAssigned",

        select:
          "employeeName mobileNumber",
      })

      .populate({

        path: "status",

        select:
          "statusName",
      });
  };

// =====================================
// UPDATE
// =====================================

const updateDailyCallSheet =
  async (
    id,
    data
  ) => {

    return await DailyCallSheet.findByIdAndUpdate(

      id,

      data,

      {
        new: true,

        runValidators: true,
      }
    )

      .populate({

        path:
          "technicianAssigned",

        select:
          "employeeName",
      })

      .populate({

        path: "status",

        select:
          "statusName",
      });
  };

// =====================================
// DELETE
// =====================================

const deleteDailyCallSheet =
  async (id) => {

    return await DailyCallSheet.findByIdAndDelete(
      id
    );
  };

module.exports = {

  createDailyCallSheet,

  getAllDailyCallSheets,

  getSingleDailyCallSheet,

  updateDailyCallSheet,

  deleteDailyCallSheet,
};