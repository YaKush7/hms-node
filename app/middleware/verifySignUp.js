const db = require("../models");
const Patient = db.patient;

checkDuplicate = (req, rep, next) => {
  Patient.findOne({ id: req.body.id }).exec((err, patient) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (patient) {
      rep.status(400).send({ msg: "Failed user already exist" });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicate,
};

module.exports = verifySignUp;
