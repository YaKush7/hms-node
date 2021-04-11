const mongoose = require("mongoose");

const Patient_data = mongoose.model(
  "Patient_data",
  new mongoose.Schema({
    id: Number,
    prescription: String,
    doc_id: Number,
    date: Date,
  })
);

module.exports = Patient_data;
