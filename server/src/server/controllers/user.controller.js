const User = require('../../models/user');
const errorHandler = require('../middlewares/handleError');
require('dotenv').config();

class UserController {
  static async getProfiles(req, res) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      if (!users) {
        return res.status(400).json({ message: 'Unable to load profiles' });
      }
      return res.status(201).json({
        status: 200,
        message: users,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getProfile(req, res) {
    try {
      let user = await User.find(req.body);
      if (!user) {
        return res.status(400).json({ message: 'Unable to load profile' });
      }
      return res.status(201).json({
        status: 200,
        message: reports,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async deleteProfile(req, res) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ message: 'Profile unavailable' });
      }
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: 'Profile Deleted Successfully',
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async updateProfile(req, res) {
    const data = req.body;
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ message: 'Profile unavailable' });
      }
      await User.findByIdAndUpdate(req.params.id, { data });
      return res.status(200).json({
        message: 'Profile Updated Successfully',
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }
}

module.exports = UserController;
