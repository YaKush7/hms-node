const config = require("../config/auth.config");
const db = require("../models");

const Credentials = db.credentials;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, rep) => {
  const cred = new Credentials({
    id: req.body.id,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  cred.save((err, cred) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    rep.send({ msg: "register successful" });
  });
};

exports.signin = (req, rep) => {
  if (!req.body.role) {
    return rep.status(401).send({ accessToken: null, msg: "invalid role" });
  }
  Credentials.findOne({
    id: req.body.id,
    role: req.body.role,
  }).exec((err, cred) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (!cred) {
      return rep.status(404).send({ msg: "User not found" });
    }

    var isPassValid = bcrypt.compareSync(req.body.password, cred.password);
    if (!isPassValid) {
      return rep.status(401).send({ accessToken: null, msg: "invalid pass" });
    }

    if (cred.role !== req.body.role) {
      return rep.status(401).send({ accessToken: null, msg: "invalid role" });
    }

    var token = jwt.sign({ uid: cred.id, urole: cred.role }, config.key, { expiresIn: 86400 });
    rep.status(200).send({
      id: cred.id,
      role: cred.role,
      accessToken: token,
    });
  });
};
