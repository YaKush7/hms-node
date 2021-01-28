const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const Credentials = db.credentials;

verifyToken = (req, rep, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return rep.status(403).send({ msg: "No token" });
  }

  jwt.verify(token, config.key, (err, decoded) => {
    if (err) {
      return rep.status(401).send({ msg: "Unauthorized" });
    }

    Credentials.findOne({
      id: decoded.uid,
      role: req.headers["role"],
    }).exec((err, cred) => {
      if (err) {
        return rep.status(403).send({ msg: "Error" });
      }

      if (!cred) {
        return rep.status(401).send({ msg: "Unauthorized" });
      }

      req.uid = decoded.uid;
      req.urole = decoded.urole;
      next();
    });
  });
};

verifyRole = (req, rep, next) => {
  let Role = req.headers["role"];

  if (!Role) {
    return rep.status(403).send({ msg: "No Role" });
  }

  if (db.ROLES.includes(Role)) {
    next();
  } else {
    return rep.status(401).send({ msg: "Invlaid Role" });
  }
};

const authJWT = {
  verifyToken,
  verifyRole,
};

module.exports = authJWT;
