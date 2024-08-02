const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const CompanyController = require('../controllers/company.controller');
const sendMaintenanceMail = require('../middlewares/sendMaintenanceMail');

router.post('/createCompany', CompanyController.create, sendMaintenanceMail);
router.get('/', AuthMiddleware, CompanyController.getCompanies);
router.get('/getCompany', AuthMiddleware, CompanyController.getCompany);

module.exports = router;
