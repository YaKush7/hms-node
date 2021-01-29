const mongoose = require("mongoose");

const Staff = mongoose.model(
  "Staff",
  new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    gender: String,
    phone: Number,
    address: String,
  })
);

module.exports = Staff;
