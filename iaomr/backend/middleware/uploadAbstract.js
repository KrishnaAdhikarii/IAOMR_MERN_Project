const multer = require("multer");
const path = require("path");

// STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/abstracts");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// FILE FILTER

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF/DOC/DOCX files are allowed"
      ),
      false
    );
  }
};

// MULTER CONFIG

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB
  },
  fileFilter,
});

module.exports = upload;