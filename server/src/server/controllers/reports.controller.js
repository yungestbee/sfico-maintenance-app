const Reports = require('../../models/reports');
const errorHandler = require('../middlewares/handleError');
require('dotenv').config();

class ReportController {
  static async create(req, res) {
    try {
      let { file, company, machine, engineer } = req.body;
      console.log(req.body);
      // let engineer = req.user.username

      let report = new Reports({
        file,
        company,
        machine,
        engineer,
      });

      await report.save();

      return res.status(201).json({
        status: 200,
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
      let reports = await Reports.find({});
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

  // static async getReportss(req, res) {
  //   try {
  //     let reports = await Reports.find().populate('user');
  //     if (!reports) {
  //       return res.status(400).json({ message: 'Unable to load reports' });
  //     }
  //     return res.status(200).json({
  //       status: 200,
  //       message: reports,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     const errors = errorHandler.dbSchemaErrors(error);
  //     return res.status(403).json({ Message: errors });
  //   }
  // }

  static async getReport(req, res) {
    try {
      let reports = await Reports.find(req.body);
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
}

module.exports = ReportController;
