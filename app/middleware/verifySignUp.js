const db = require("../models");
const Credentials = db.credentials;

checkDuplicate = (req, rep, next) => {
  Credentials.findOne({ id: req.body.id, role: req.body.role }).exec((err, cred) => {
    if (err) {
      rep.status(500).send({ msg: err });
      return;
    }

    if (cred) {
      rep.status(400).send({ msg: "Failed user already exist" });
      return;
    }

    next();
  });
};

checkRole = (req, rep, next) => {
  if (db.ROLES.includes(req.body.role)) {
    next();
  } else {
    rep.status(400).send({ msg: "Invalid Role" });
    return;
  }
};

const verifySignUp = {
  checkDuplicate,
  checkRole,
};

module.exports = verifySignUp;
