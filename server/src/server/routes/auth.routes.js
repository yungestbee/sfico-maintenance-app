const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/auth.controller");
const sendMail = require("../middlewares/sendToken")

router.post('/signup', AuthController.register, sendMail);
router.post('/login', AuthController.login);
router.post('/changepassword', AuthMiddleware.authenticateUser, AuthController.changePassword);
router.post('/logout', AuthMiddleware.authenticateUser, AuthController.logout);

module.exports = router;
