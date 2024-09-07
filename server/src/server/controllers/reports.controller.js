const Reports = require('../../models/reports');
const findOrCreateCompany = require('../middlewares/CompanyControl');
const errorHandler = require('../middlewares/handleError');
require('dotenv').config();

class ReportController {
  static async create(req, res) {
    try {
      let { file, name, location, machine } = req.body;
      const companyy = await findOrCreateCompany(name, location);
      console.log(req.body);
      // let engineer = req.user.username

      let report = new Reports({
        file,
        company: companyy._id,
        machine,
        engineer: req.user._id,
      });

      await report.save();

      return res.status(200).json({
        message: 'Report created successfully',
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getReports(req, res) {
    try {
      const reports = await Reports.find()
        .populate('engineer')
        .populate('company')
        .sort({ createdAt: -1 });
      if (!reports) {
        return res.status(400).json({ message: 'Unable to load reports' });
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

  static async getReportss(req, res) {
    try {
      let reports = await Reports.find()
        .sort({ createdAt: -1 })
        .populate('company');
      if (!reports) {
        return res.status(400).json({ message: 'Unable to load reports' });
      }
      return res.status(200).json({
        status: 200,
        message: reports,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getReport(req, res) {
    try {
      let reports = await Reports.find(req.body).populate('company');
      if (!reports) {
        return res.status(400).json({ message: 'Unable to load reports' });
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

  static async deleteReport(req, res) {
    try {
      let reports = await Reports.findById(req.params.id);
      if (!reports) {
        return res.status(400).json({ message: 'report unavailable' });
      }
      await Reports.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "Report Successfully Deleted"
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }
}

module.exports = ReportController;
