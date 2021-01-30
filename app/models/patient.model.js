const mongoose = require("mongoose");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    id: Number,
    name: String,
    dob: Date,
    gender: String,
    phone: Number,
    address: String,
    lvisit: Date,
    email: String,
    img_path: String,
  })
);

module.exports = Patient;
