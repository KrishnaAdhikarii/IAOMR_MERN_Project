const express = require("express");

const router = express.Router();

const {
  submitAbstract,
  getAllAbstracts,
  getSingleAbstract,
  updateAbstractStatus,
  deleteAbstract,
} = require(
  "../controllers/abstractController"
);

// =============================
// PUBLIC ROUTES
// =============================

// Submit Abstract
router.post(
  "/submit",
  submitAbstract
);

// =============================
// ADMIN / REVIEWER ROUTES
// =============================

// Get All Abstracts
router.get(
  "/all",
  getAllAbstracts
);

// Get Single Abstract
router.get(
  "/:id",
  getSingleAbstract
);

// Update Review Status
router.put(
  "/review/:id",
  updateAbstractStatus
);

// Delete Abstract (optional)
router.delete(
  "/:id",
  deleteAbstract
);

module.exports = router;