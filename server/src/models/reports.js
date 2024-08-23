const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');



const reportSchema = new Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    engineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    machine: {
      type: Array,
      required: true,
    },
    reportDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Report = model('Report', reportSchema);

module.exports = Report;
