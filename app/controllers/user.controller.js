const db = require("../models");
const Patient = db.patient;

exports.allAccess = (req, rep) => {
  rep.status(200).send("public content");
};

exports.userAccess = (req, rep) => {
  Patient.findOne({ id: req.uid }).exec((err, patient) => {
    if (err) {
      return rep.status(403).send({ msg: "Error" });
    }

    if (!patient) {
      return rep.status(401).send({ msg: "Unauthorized" });
    }

    console.log(patient);
    rep.status(200).send({ uid: req.uid, urole: req.urole, data: { ...patient } });
  });
};
