const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    //give database name Nexas here in place of test
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log("No connection"));
