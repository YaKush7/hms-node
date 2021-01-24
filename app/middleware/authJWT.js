const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

verifyToken = (req, rep, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return rep.status(403).send({ msg: "No token" });
  }

  jwt.verify(token, config.key, (err, decoded) => {
    if (err) {
      return rep.status(401).send({ msg: "Unauthorized" });
    }
    req.uid = decoded.uid;
    next();
  });
};

const authJWT = {
  verifyToken,
};

module.exports = authJWT;
