const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
const companyController = require('../controllers/companyController');


// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', auth, userController.updateUser);

// Delete user
router.delete('/:id', [auth,admin], userController.deleteUser);

router.post('/companies/:companyId/queue',[auth],companyController.addUserToQueue)

module.exports = router;
