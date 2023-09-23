const express = require("express");
const router = express.Router();
require("../db/conn.js");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Router
//Register
router.post("/register", async (req, res) => {
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
        const userreg =  await user.save();
        if (userreg){
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(500).json({ message: "User registered unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const userLogin = await User.findOne({ email: email });
        
        if (userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            if (isMatch){
                res.status(201).json({ message: "User logged in successfully" });
            } else {
                res.status(400).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err){
        console.log(err);
    }
});


module.exports = router;