const multer = require("multer");
const { s3Storage } = require("../utils/fileUploadS3");

// function to sanitize files and send error for unsupported files
const sanitizeFile = (file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/pdf" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformatsofficedocument.wordprocessingml.document"
  )
    cb(null, true);
  else {
    cb("Error: File type not allowed!");
  }
};


// our middleware
const upload = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});

module.exports = {
  upload,
};
