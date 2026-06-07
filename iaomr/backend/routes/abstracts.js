const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadAbstract");


const {
  submitAbstract,
  getAllAbstracts,
  getSingleAbstract,
  updateAbstractStatus,
  deleteAbstract,
} = require("../controllers/abstractController");

// SUBMIT ABSTRACT

router.post(
  "/submit",
  upload.single("abstractFile"),
  submitAbstract
);

// GET ALL

router.get("/all", getAllAbstracts);

// GET SINGLE

router.get("/:id", getSingleAbstract);

// REVIEW

router.put("/review/:id", updateAbstractStatus);

// DELETE

router.delete("/:id", deleteAbstract);

module.exports = router;