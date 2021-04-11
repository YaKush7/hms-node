const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = { origin: "http://localhost:3000" };

//app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB error");
    process.exit();
  });

// route --> /
app.get("/", (req, rep) => {
  rep.json({ msg: "Working" });
});

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
