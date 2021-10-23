const mongoose = require("mongoose");

const Staff = mongoose.model(
  "Staff",
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
    role: String,
  })
);

module.exports = Staff;
