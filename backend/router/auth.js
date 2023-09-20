const express = require("express");
const router = express.Router();
require("../db/conn.js");
const User = require("../models/user.js");

// fOR ROUTER TESTING PURPOSE
// router.get("/", (req, res) => {
//   res.send("Hello World! from router");
// });

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
        const userreg = await user.save();
        if (userreg){
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(500).json({ message: "User registered unsuccessfully" });
        }

    } catch (err){
        console.log(err);
    }
});
    //console.log(req.body); // to print data in console for testing
    //if function is not working
    //res.json({message : req.body}); to print data in console for testing

module.exports = router;