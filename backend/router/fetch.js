const express = require("express");
const router = express.Router();
require("../db/conn.js");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//fetch user data from database and display it on the frontend
//Fetch
router.get("/fetchuser", async (req, res) => {
    try {
        const userFetch = await User.find();
        console.log(User.name);
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

module.exports = router;