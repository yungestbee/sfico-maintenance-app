const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    location: {
      type: String,
    },
    machine: {
      type: Array,
      // required: true,
    },
    maintenance: {
      type: Object,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;
