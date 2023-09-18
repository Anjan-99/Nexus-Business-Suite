//basis server file sysntax mangodb atlas
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//const userRoute = require("./routes/user.route");
const app = express();
//const path = require("path");
const PORT = process.env.PORT || 4000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://viral:viral1234@nexas.nwai8ac.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});

// Path: backend/routes/user.route.js
//basis server file sysntax mangodb atlas