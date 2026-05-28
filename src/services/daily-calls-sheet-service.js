// =====================================
// services/daily-calls-sheet-service.js
// =====================================

const repository =
  require(
    "../repositories/daily-calls-sheet-repository"
  );

const CallEntry =
  require(
    "../models/call-entry-form-model"
  );

const DailyCallSheet =
  require(
    "../models/daily-calls-sheet-model"
  );

// =====================================
// CREATE
// =====================================

const createDailyCallSheet =
  async (data) => {

    return await repository.createDailyCallSheet(
      data
    );
  };

// =====================================
// GET ALL
// =====================================

const getAllDailyCallSheets =
  async () => {

    const data =
      await DailyCallSheet.find()

        // =====================================
        // CUSTOMER
        // =====================================

        .populate({

          path: "customer",

          select:
            "customerName mobileNumber contactNo",
        })

        // =====================================
        // EMPLOYEE
        // =====================================

        .populate({

          path:
            "technicianAssigned",

          select:
            "employeeName",
        })

        // =====================================
        // STATUS
        // =====================================

        .populate({

          path: "status",

          select:
            "statusName status",
        })

        // =====================================
        // SORT
        // =====================================

        .sort({

          createdAt: -1,
        });

    console.log(
      "POPULATED DAILY DATA =>",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    return data;
  };

// =====================================
// GET SINGLE
// =====================================

const getSingleDailyCallSheet =
  async (id) => {

    return await DailyCallSheet.findById(id)

      // =====================================
      // CUSTOMER
      // =====================================

      .populate({

        path: "customer",

        select:
          "customerName mobileNumber contactNo",
      })

      // =====================================
      // EMPLOYEE
      // =====================================

      .populate({

        path:
          "technicianAssigned",

        select:
          "employeeName",
      })

      // =====================================
      // STATUS
      // =====================================

      .populate({

        path: "status",

        select:
          "statusName status",
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

    return await repository.updateDailyCallSheet(

      id,

      data
    );
  };

// =====================================
// DELETE
// =====================================

const deleteDailyCallSheet =
  async (id) => {

    return await repository.deleteDailyCallSheet(
      id
    );
  };

// =====================================
// SYNC OLD CALL ENTRY DATA
// =====================================

const syncOldCallEntries =
  async () => {

    try {

      // =====================================
      // FETCH CALL ENTRIES
      // =====================================

      const callEntries =
        await CallEntry.find()

          .populate(
            "customer"
          )

          .sort({

            createdAt: -1,
          });

      // =====================================
      // LOOP
      // =====================================

      for (
        const item of callEntries
      ) {

        // =====================================
        // CHECK EXISTING
        // =====================================

        const exists =
          await DailyCallSheet.findOne({

            callEntry:
              item._id,
          });

        if (exists) {

          continue;
        }

        // =====================================
        // CREATE DAILY SHEET
        // =====================================

        await DailyCallSheet.create({

          callEntry:
            item._id,

          callNo:
            item.callNo,

          customer:
            item.customer?._id,

          customerName:
            item.customer
              ?.customerName ||

            "",

          customerContactNo:
            item.customer
              ?.mobileNumber ||

            item.customer
              ?.contactNo ||

            "",

          callDate:
            item.callDate,

          callAttempt:
            item.callAttempt || 1,

          timing:
            item.preferredTimings || "",

          jobToBeDone:
            item.problemDetails
              ?.toString() || "",

          remarks:
            item.warrantyInformation || "",

          comments:
            "Auto Synced from Call Entry",
        });
      }

      return {

        success: true,

        message:
          "Old Call Entries Synced Successfully",
      };

    } catch (error) {

      throw new Error(
        error.message
      );
    }
  };

module.exports = {

  createDailyCallSheet,

  getAllDailyCallSheets,

  getSingleDailyCallSheet,

  updateDailyCallSheet,

  deleteDailyCallSheet,

  syncOldCallEntries,
};