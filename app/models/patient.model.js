const mongoose = require("mongoose");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    id: Number,
    password: String,
  })
);

module.exports = Patient;
