// =====================================
// controllers/calls-assigning-controller.js
// =====================================

const {
  CallsAssigningService,
} = require("../services");

const cloudinary = require(
  "../config/cloudinary"
);

// =====================================
// DAILY CALL SHEET MODEL
// =====================================

const DailyCallSheet = require(
  "../models/daily-calls-sheet-model"
);

// =====================================
// CREATE CALL ASSIGNING
// =====================================

async function createCallsAssigning(
  req,
  res
) {
  try {

    const data = req.body;

    let attachmentData = {};
    let audioData = {};

    // =====================================
    // ATTACHMENT
    // =====================================

    if (req.files?.attachment?.[0]) {

      attachmentData = {

        attachment: {

          url:
            req.files
              .attachment[0].path,

          public_id:
            req.files
              .attachment[0]
              .filename,
        },
      };
    }

    // =====================================
    // AUDIO
    // =====================================

    if (req.files?.audio?.[0]) {

      audioData = {

        audio: {

          url:
            req.files
              .audio[0].path,

          public_id:
            req.files
              .audio[0]
              .filename,
        },
      };
    }

    // =====================================
    // FINAL DATA
    // =====================================

    const callsAssigningData = {

      ...data,

      ...attachmentData,

      ...audioData,
    };

    // =====================================
    // SAVE CALL ASSIGNING
    // =====================================

    const callsAssigning =
      await CallsAssigningService.createCallsAssigning(
        callsAssigningData
      );

    // =====================================
    // AUTO CREATE DAILY CALL SHEET
    // =====================================

    try {

      const dailyData = {

        // =====================================
        // CALL ENTRY
        // =====================================

        callEntry:
          callsAssigning.callNo || null,

        callNo:
          callsAssigning.callNo || "",

        // =====================================
        // CALL DATE
        // =====================================

        callDate:
          callsAssigning.assignDate ||
          new Date(),

        callAttempt: 1,

        // =====================================
        // CUSTOMER
        // =====================================

        customer:
          callsAssigning.customer || null,

        customerName:
          callsAssigning.customerName ||
          "",

        customerContactNo:
          callsAssigning.customerContactNo ||
          "",

        // =====================================
        // EMPLOYEE
        // =====================================

        technicianAssigned:
          callsAssigning.employee || null,

        // =====================================
        // STATUS
        // =====================================

        status:
          callsAssigning.status || null,

        // =====================================
        // TIMING
        // =====================================

        timing:
          callsAssigning.assignTime ||
          "",

        // =====================================
        // REMARKS
        // =====================================

        remarks:
          callsAssigning.remarks || "",

        comments: "",

        // =====================================
        // APPROVAL STATUS
        // =====================================

        approvalStatus:
          "Pending",

        // =====================================
        // ATTACHMENT
        // =====================================

        attachment:
          callsAssigning.attachment ||
          null,
      };

      console.log(
        "FINAL DAILY DATA =>",
        dailyData
      );

      // =====================================
      // SAVE DAILY CALL SHEET
      // =====================================

      const inserted =
        new DailyCallSheet(
          dailyData
        );

      await inserted.save();

      console.log(
        "DAILY CALL SHEET SAVED =>",
        inserted
      );

    } catch (dailyError) {

      console.log(
        "DAILY CALL SHEET ERROR =>",
        dailyError
      );
    }

    return res.status(200).json({

      success: true,

      message:
        "Call Assigned Successfully",

      data: callsAssigning,
    });

  } catch (error) {

    console.log(
      "CREATE CALL ERROR =>",
      error
    );

    return res.status(500).json({

      status: "Error",

      message:
        error.message,

      error,
    });
  }
}

// =====================================
// GET ALL CALLS
// =====================================

async function getCallsAssigning(
  req,
  res
) {
  try {

    const callsAssigning =
      await CallsAssigningService.getCallsAssigning();

    return res.status(200).json({

      success: true,

      message:
        "Calls Fetched Successfully",

      data: callsAssigning,
    });

  } catch (error) {

    return res.status(400).json({

      success: false,

      message:
        "Error in Fetching Calls",

      error:
        error.message,
    });
  }
}

// =====================================
// GET SINGLE CALL
// =====================================

async function getCallAssigning(
  req,
  res
) {
  try {

    const { id } = req.params;

    const callAssigning =
      await CallsAssigningService.getCallAssigning(
        id
      );

    if (!callAssigning) {

      return res.status(404).json({

        success: false,

        message:
          "Call Assigning Not Found",
      });
    }

    return res.status(200).json({

      success: true,

      data: callAssigning,
    });
  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error Fetching Call",

      error:
        error.message,
    });
  }
}

// =====================================
// UPDATE CALL
// =====================================

async function updateCallsAssigning(
  req,
  res
) {
  try {

    const { id } = req.params;

    const oldCall =
      await CallsAssigningService.getCallAssigning(
        id
      );

    if (!oldCall) {

      return res.status(404).json({

        success: false,

        message:
          "Call Assigning Not Found",
      });
    }

    const data = req.body;

    // =====================================
    // UPDATE ATTACHMENT
    // =====================================

    if (req.files?.attachment?.[0]) {

      if (
        oldCall.attachment?.public_id
      ) {

        await cloudinary.uploader.destroy(
          oldCall.attachment.public_id
        );
      }

      data.attachment = {

        url:
          req.files
            .attachment[0].path,

        public_id:
          req.files
            .attachment[0]
            .filename,
      };
    }

    // =====================================
    // UPDATE AUDIO
    // =====================================

    if (req.files?.audio?.[0]) {

      if (
        oldCall.audio?.public_id
      ) {

        await cloudinary.uploader.destroy(
          oldCall.audio.public_id,
          {
            resource_type:
              "video",
          }
        );
      }

      data.audio = {

        url:
          req.files
            .audio[0].path,

        public_id:
          req.files
            .audio[0]
            .filename,
      };
    }

    const updatedCall =
      await CallsAssigningService.updateCallsAssigning(
        id,
        data
      );

    return res.status(200).json({

      success: true,

      message:
        "Call Updated Successfully",

      data: updatedCall,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error Updating Call",

      error:
        error.message,
    });
  }
}

// =====================================
// DELETE CALL
// =====================================

async function deleteCallsAssigning(
  req,
  res
) {
  try {

    const { id } = req.params;

    const callAssigning =
      await CallsAssigningService.getCallAssigning(
        id
      );

    if (!callAssigning) {

      return res.status(404).json({

        success: false,

        message:
          "Call Assigning Not Found",
      });
    }

    // =====================================
    // DELETE ATTACHMENT
    // =====================================

    if (
      callAssigning.attachment
        ?.public_id
    ) {

      await cloudinary.uploader.destroy(
        callAssigning.attachment
          .public_id
      );
    }

    // =====================================
    // DELETE AUDIO
    // =====================================

    if (
      callAssigning.audio?.public_id
    ) {

      await cloudinary.uploader.destroy(
        callAssigning.audio.public_id,
        {
          resource_type:
            "video",
        }
      );
    }

    // =====================================
    // DELETE DATABASE
    // =====================================

    await CallsAssigningService.deleteCallsAssigning(
      id
    );

    return res.status(200).json({

      success: true,

      message:
        "Call and Files Deleted Successfully",
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error Deleting Call",

      error:
        error.message,
    });
  }
}

module.exports = {

  createCallsAssigning,

  getCallsAssigning,

  getCallAssigning,

  updateCallsAssigning,

  deleteCallsAssigning,
};