const { authJWT } = require("../middleware");
const controller = require("../controllers/user.controller");
const verifyAppointment = require("../middleware/verifyAppointment");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/patient", [authJWT.verifyRole, authJWT.verifyToken], controller.patientAccess);
  app.get("/api/test/staff", [authJWT.verifyRole, authJWT.verifyToken], controller.staffAccess);
  app.get("/api/test/patientdata", [authJWT.verifyRole, authJWT.verifyToken], controller.getPatientData);
  app.post("/api/test/appointment", [verifyAppointment.checkDuplicate], controller.saveAppointment);
};
