const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ReportController = require("../controllers/reports.controller");

router.post('/createReport', ReportController.create);
router.get('/', AuthMiddleware, ReportController.getReports);
router.get('/getReport', AuthMiddleware, ReportController.getReport);

module.exports = router;
