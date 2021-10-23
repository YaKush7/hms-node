const db = require("../models");
const Patient = db.patient;
const Staff = db.staff;
const Patient_Data = db.patient_data;
const Appointment = db.appointment;

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

exports.getPatientData = (req, res) => {
  if (req.urole === "patient") {
    Patient_Data.find({ id: req.uid }).exec((err, data) => {
      if (err) {
        return res.status(403).send({ msg: "Error" });
      }

      if (!data) {
        return res.status(403).send({ msg: "No data" });
      }

      console.log(data);
      res.status(200).send({ records: { data } });
    });
  } else {
    Patient_Data.find({ doc_id: req.uid }).exec((err, data) => {
      if (err) {
        return res.status(403).send({ msg: "Error" });
      }

      if (!data) {
        return res.status(403).send({ msg: "No data" });
      }

      console.log(data);
      res.status(200).send({ records: { data } });
    });
  }
};

exports.setPatientData = (req, res) => {
  const pdata = new Patient_Data({
    id: req.query.id,
    prescription: "link1",
    doc_id: req.query.doc_id,
    doc_name: req.query.doc_name,
    date: req.query.date,
    pat_name: req.query.pat_name,
  });

  pdata.save((err, doc) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }

    if (doc) {
      res.status(200).send({ msg: "Saved" });
    }
  });
};

exports.saveAppointment = (req, res) => {
  const appoint = new Appointment({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    phone: req.body.phone,
    specialist: req.body.specialist,
    slot: req.body.slot,
  });

  appoint.save((err, appoint) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }

    if (appoint) {
      res.send({ msg: "Appointment Requested" });
      return;
    }
  });
};
