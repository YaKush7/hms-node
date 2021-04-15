const db = require("../models");
const Appointment = db.appointment;

checkDuplicate = (req, rep, next) => {
  Appointment.findOne({ phone: req.body.phone, name: req.body.name }).exec((err, appoint) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (appoint) {
      rep.status(400).send({ msg: "Appointment already requested" });
      return;
    }

    next();
  });
};

const verifyAppointment = {
  checkDuplicate,
};

module.exports = verifyAppointment;
