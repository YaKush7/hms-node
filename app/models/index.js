const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.patient = require("./patient.model");
db.staff = require("./staff.model");
db.credentials = require("./credentials.model");
db.patient_data = require("./patient.data.model");
db.appointment = require("./appointment.model");
db.ROLES = ["admin", "doctor", "reception", "patient"];

module.exports = db;
