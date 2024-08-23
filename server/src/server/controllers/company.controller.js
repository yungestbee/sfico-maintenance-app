const Company = require('../../models/company');
const errorHandler = require('../middlewares/handleError');
require('dotenv').config();

class CompanyController {
  static async create(req, res, next) {
    try {
      let { email, name, phone, address, machine, maintenance } = req.body;
      // console.log(req.body);
      // let engineer = req.user.username

      let company = new Company({
        email,
        name,
        phone,
        address,
        machine,
        maintenance,
      });

      await company.save();
      if (maintenance.length !== 0) {
        req.amount = maintenance.amount;
        req.company = name;
        req.duration = maintenance.duration;
        req.machine = maintenance.machine;
        req.email = email;
      }

      next();

      //   return res.status(201).json({
      //     status: 200,
      //     message: 'Report created successfully',
      //   });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getCompanies(req, res) {
    try {
      let companies = await Company.find({});
      if (!companies) {
        return res.status(400).json({ message: 'Unable to load companies' });
      }
      return res.status(201).json({
        status: 200,
        message: companies,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getCompaniesOnMaintenance(req, res) {
    try {
      let companiesOnMaintenance = await Company.find({ maintenance });
      if (!companiesOnMaintenance) {
        return res.status(400).json({ message: 'Unable to load companies' });
      }
      return res.status(201).json({
        status: 200,
        message: companiesOnMaintenance,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async getCompany(req, res) {
    try {
      let company = await Company.find(req.body);
      if (!company) {
        return res.status(400).json({ message: 'Unable to load reports' });
      }
      return res.status(201).json({
        status: 200,
        message: company,
      });
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }
}

module.exports = CompanyController;
