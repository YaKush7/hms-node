exports.allAccess = (req, rep) => {
  rep.status(200).send("public content");
};

exports.userAccess = (req, rep) => {
  rep.status(200).send({ uid: req.uid, urole: req.urole, msg: "patient content" });
};
