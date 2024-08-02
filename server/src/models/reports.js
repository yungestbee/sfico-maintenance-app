const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const reportSchema = new Schema(
  {
    file: {
      type: String,
      required: true,
    },
    company: {
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
  },
  {
    timestamps: true,
  }
);

const Report = model('Report', reportSchema);

module.exports = Report;
