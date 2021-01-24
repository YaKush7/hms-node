exports.allAccess = (req, rep) => {
  rep.status(200).send("public content");
};

exports.userAccess = (req, rep) => {
  rep.status(200).send("patient content");
};
