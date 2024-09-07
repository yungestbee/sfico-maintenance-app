const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/getEngineer',
  AuthMiddleware.authenticateUser,
  UserController.getProfile
);
router.get(
  '/',
  AuthMiddleware.authenticateUser,
  UserController.getProfiles
);
router.put('/:id', AuthMiddleware.authenticateUser, UserController.updateProfile);
router.delete(
  '/:id',
  AuthMiddleware.authenticateUser,
  UserController.deleteProfile
);

module.exports = router;
