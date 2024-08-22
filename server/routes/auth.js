const express = require('express');
const router = express.Router();
const multer  = require('multer')
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const path = require('path')
// Register route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images')); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

const upload = multer({ storage: storage });
router.post(
  '/register',
  [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('lastname', 'Last name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('organization', 'Organization is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('birthday', 'Birthday is required').isDate(),
    check('file',"no file uploaded").not().isEmpty()
  ],upload.single('file'),
  authController.register
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

module.exports = router;
