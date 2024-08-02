const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware')

// router.get('/getEngineer', AuthMiddleware.authenticateUser, UserController.getProfile);
// router.put('/', AuthMiddleware.authenticateUser, UserController.updateUser);
// router.delete('/deleteEngineer/:userId', AuthMiddleware.authenticateUser, UserController.deleteUser);

module.exports = router;
