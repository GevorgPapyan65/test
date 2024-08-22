const multer = require('multer');
const path = require('path');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid collisions
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
