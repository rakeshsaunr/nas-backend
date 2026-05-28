// =====================================
// routes/calls-assigning-routes.js
// =====================================

const express = require("express");
const router = express.Router();

const controller = require(
  "../../controllers/calls-assigning-controller"
);

// =====================================
// CLOUDINARY MULTER
// =====================================

const upload = require(
  "../../middlewares/upload"
);

// =====================================
// ROUTES
// =====================================

// CREATE
router.post(
  "/",
  upload.fields([
    { name: "attachment", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  controller.createCallsAssigning
);

// GET ALL
router.get(
  "/",
  controller.getCallsAssigning
);

// GET SINGLE
router.get(
  "/:id",
  controller.getCallAssigning
);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    { name: "attachment", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  controller.updateCallsAssigning
);

// DELETE
router.delete(
  "/:id",
  controller.deleteCallsAssigning
);

module.exports = router;