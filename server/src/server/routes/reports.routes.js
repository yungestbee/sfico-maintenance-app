const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const ReportController = require('../controllers/reports.controller');

router.post(
  '/createReport',
  AuthMiddleware.authenticateUser,
  ReportController.create
);
router.get('/', AuthMiddleware.authenticateUser, ReportController.getReports);
// router.get('/adminReports', AuthMiddleware, ReportController.getReports);
router.get(
  '/getReport',
  AuthMiddleware.authenticateUser,
  ReportController.getReport
);

module.exports = router;
