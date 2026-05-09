const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
cb(new Error("Only JPG/PNG allowed"), false);  }
};

module.exports = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
});