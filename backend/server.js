//basis server file sysntax mangodb atlas
const e = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env"});
require("./db/conn.js");
const PORT = process.env.PORT;


const app = e();
app.use(e.json());
app.use(cors()); 

//Router
app.use(require("./router/auth.js"));

// app.get('/login' , (req, res) => {
//   res.send('Hello World!')
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
