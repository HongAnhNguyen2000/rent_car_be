const multer = require("multer");

export const storage = multer.memoryStorage();

export const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

export const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000 },
});