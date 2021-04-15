const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    phone: String,
    specialist: String,
    slot: String,
  })
);

module.exports = Appointment;
