const Company = require('../../models/company');

async function createCompany(name, location) {
  const company = new Company({ name, location });
  await company.save();
  return company;
}

async function findOrCreateCompany(name, location) {
  let company = await Company.findOne({ name });
  if (!company) {
    company = await createCompany(name, location);
  }
  return company;
}
module.exports = findOrCreateCompany;
