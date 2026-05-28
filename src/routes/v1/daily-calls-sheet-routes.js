// =====================================
// routes/v1/daily-calls-sheet-routes.js
// =====================================

const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../../controllers/daily-calls-sheet-controller"
  );

// =====================================
// CREATE
// POST => /api/v1/daily-calls-sheet
// =====================================

router.post(
  "/",
  controller.createDailyCallSheet
);

// =====================================
// SYNC OLD CALL ENTRY DATA
// POST => /api/v1/daily-calls-sheet/sync-old-data
// =====================================

router.post(
  "/sync-old-data",
  controller.syncOldData
);

// =====================================
// GET ALL
// GET => /api/v1/daily-calls-sheet
// =====================================

router.get(
  "/",
  controller.getAllDailyCallSheets
);

// =====================================
// GET SINGLE
// GET => /api/v1/daily-calls-sheet/:id
// =====================================

router.get(
  "/:id",
  controller.getSingleDailyCallSheet
);

// =====================================
// UPDATE
// PUT => /api/v1/daily-calls-sheet/:id
// =====================================

router.put(
  "/:id",
  controller.updateDailyCallSheet
);

// =====================================
// DELETE
// DELETE => /api/v1/daily-calls-sheet/:id
// =====================================

router.delete(
  "/:id",
  controller.deleteDailyCallSheet
);

module.exports =
  router;