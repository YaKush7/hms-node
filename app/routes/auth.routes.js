const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, rep, next) {
    rep.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept, role");
    next();
  });
  app.post("/api/auth/signup", [verifySignUp.checkRole, verifySignUp.checkDuplicate], controller.signup);

  app.post("/api/auth/signin", controller.signin);
};
