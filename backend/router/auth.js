const express = require("express");
const router = express.Router();
require("../db/conn.js");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const User = require("../models/user.js");
// fOR ROUTER TESTING PURPOSE
// router.get("/", (req, res) => {
//   res.send("Hello World! from router");
// });

//Router
//Register
router.post("/user", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        const user = new User({ name, email, password });
        
        await user.save();
        console.log(userreg);
        if (userreg){
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(500).json({ message: "User registered unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//login 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const userlogin = await User.findOne({ email: email });
        //console.log(userlogin); for testing
        if (userlogin) {
            const isMatch = await userlogin.password === password;
            if (isMatch) {
                res.status(201).json({ message: "User logged in successfully" });
            } else {
                res.status(500).json({ error: "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});



    //console.log(req.body); // to print data in console for testing
    //if function is not working
    //res.json({message : req.body}); to print data in console for testing
module.exports = router;