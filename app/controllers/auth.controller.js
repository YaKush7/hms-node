const config = require("../config/auth.config");
const db = require("../models");

const Credentials = db.credentials;
const Patient = db.patient;
const Staff = db.staff;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, rep) => {
  const cred = new Credentials({
    id: req.body.id,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  if (req.body.role === "patient") {
    const pat = new Patient({
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      lvisit: "2020-12-31",
      img_path: ".\\TempResources\\default.jpeg",
      dob: req.body.dob + "T00:00:00.000+00:00",
    });

    pat.save((err, pat) => {
      if (err) {
        rep.status(500).send({ msg: err });
        return;
      }

      if (pat) {
        cred.save((err, cred) => {
          if (err) {
            rep.status(500).send({ msg: err });
            return;
          }

          rep.send({ msg: "register successful" });
        });
      }
    });
  } else {
    const sta = new Staff({
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      lvisit: "0000-00-00T00:00:00.000+00:00",
      img_path: ".\\TempResources\\default.jpeg",
      dob: req.body.dob + "T00:00:00.000+00:00",
    });

    sta.save((err, sta) => {
      if (err) {
        rep.status(500).send({ msg: err });
        return;
      }

      if (sta) {
        cred.save((err, cred) => {
          if (err) {
            rep.status(500).send({ msg: err });
            return;
          }

          rep.send({ msg: "register successful" });
        });
      }
    });
  }
};

exports.signin = (req, rep) => {
  if (!req.body.role) {
    return rep.status(401).send({ accessToken: null, msg: "Invalid" });
  }
  Credentials.findOne({
    id: req.body.id,
  }).exec((err, cred) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (!cred) {
      return rep.status(404).send({ msg: "Invalid" });
    }

    var isPassValid = bcrypt.compareSync(req.body.password, cred.password);
    if (!isPassValid) {
      return rep.status(401).send({ accessToken: null, msg: "Invalid" });
    }

    if (cred.role !== req.body.role) {
      return rep.status(401).send({ accessToken: null, msg: "Invalid" });
    }

    var token = jwt.sign({ uid: cred.id, urole: cred.role }, config.key, { expiresIn: 86400 });
    rep.status(200).send({
      id: cred.id,
      role: cred.role,
      accessToken: token,
    });
  });
};
