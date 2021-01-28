const db = require("../models");
const Patient = db.patient;
const Staff = db.staff;

exports.allAccess = (req, rep) => {
  rep.status(200).send("public content");
};

exports.patientAccess = (req, rep) => {
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

exports.staffAccess = (req, rep) => {
  console.log("there");
  Staff.findOne({ id: req.uid }).exec((err, staff) => {
    if (err) {
      return rep.status(403).send({ msg: "Error" });
    }

    if (!staff) {
      return rep.status(401).send({ msg: "Unauthorized" });
    }

    console.log(staff);
    rep.status(200).send({ uid: req.uid, urole: req.urole, data: { ...staff } });
  });
};
