const mongoose = require("mongoose");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    gender: Number,
    phone: Number,
    address: String,
  })
);

module.exports = Patient;
