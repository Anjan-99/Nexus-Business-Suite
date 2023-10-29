const e = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/conn.js");
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const authentication = require("./middleware/authentication.js");
const jwt = require("jsonwebtoken");
const { Router } = require("./router/routes.js");

const app = e();
app.use(e.json());
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

//Router
app.use(require("./router/auth.js"));
app.use(require("./router/fetch.js"));
app.use(require("./router/add.js"));
app.use(require("./router/update.js"));
app.use(require("./router/delete.js"));
app.use(require("./router/customers.js"));
app.use(require("./router/routes.js"));

app.get("/verify", authentication, (req, res) => {
  res.json(req.rootUser);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});