const config = require("../config/auth.config");
const db = require("../models");

const Patient = db.patient;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, rep) => {
  const patient = new Patient({
    id: req.body.id,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  patient.save((err, patient) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    rep.send({ msg: "register successful" });
  });
};

exports.signin = (req, rep) => {
  Patient.findOne({
    id: req.body.id,
  }).exec((err, patient) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (!patient) {
      return rep.status(404).send({ msg: "User not found" });
    }

    var isPassValid = bcrypt.compareSync(req.body.password, patient.password);
    if (!isPassValid) {
      return rep.status(401).send({ accessToken: null, msg: "invalid pass" });
    }

    var token = jwt.sign({ uid: patient.id }, config.key, { expiresIn: 86400 });
    rep.status(200).send({
      id: patient.id,
      accessToken: token,
    });
  });
};
