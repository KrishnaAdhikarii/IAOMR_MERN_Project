const express = require("express");

const router = express.Router();

const {
  submitAbstract,
  getAllAbstracts,
  updateAbstractStatus,
} = require(
  "../controllers/abstractController"
);

// Submit
router.post(
  "/submit",
  submitAbstract
);

// Admin
router.get(
  "/all",
  getAllAbstracts
);

// Review
router.put(
  "/review/:id",
  updateAbstractStatus
);

module.exports = router;