const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authenticateJWT = require('../middleware/companyAuth');
const checkCompanyVerification = require('../middleware/isVerified')


// Create a company
router.post('/', companyController.createCompany);

// Get all companies
router.get('/', auth, companyController.getAllCompanies);

// Get company by ID
router.get('/:id', auth, companyController.getCompanyById);

// Update company
router.put('/:id', [auth, admin], companyController.verifyCompany);

// Delete company
router.delete('/:id', [auth, admin], companyController.deleteCompany);

router.post('/:companyId/queue/approve', [authenticateJWT, checkCompanyVerification],companyController.approveUser);
router.post('/:companyId/queue/reject', [authenticateJWT, checkCompanyVerification],companyController.rejectUser);

router.post('/:companyId/employees', [authenticateJWT, checkCompanyVerification],companyController.addEmployeeById);

router.get('/:companyId/queue',[authenticateJWT,checkCompanyVerification],companyController.getQueue);

router.get('/:companyId/employees',checkCompanyVerification,companyController.getAllEmployee);

router.delete('/:companyId/employees/:employeeId',[authenticateJWT,checkCompanyVerification],companyController.deleteEmployee)



module.exports = router;
