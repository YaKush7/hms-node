const mongoose = require("mongoose");

const Credentials = mongoose.model(
  "Credentials",
  new mongoose.Schema({
    id: Number,
    password: String,
    role: String,
  })
);

module.exports = Credentials;
