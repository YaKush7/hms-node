const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.patient = require("./patient.model");
db.credentials = require("./credentials.model");
db.ROLES = ["admin", "doctor", "reception", "patient"];

module.exports = db;
