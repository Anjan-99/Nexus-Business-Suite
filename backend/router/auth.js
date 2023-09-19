const express = require("express");
const router = express.Router();
require("../db/conn.js");
const User = require("../models/user.js");

// fOR ROUTER TESTING PURPOSE
// router.get("/", (req, res) => {
//   res.send("Hello World! from router");
// });

router.post("/user", (req, res) => {
    const {name, email, password} = req.body;
    //console.log(req.body); // to print data in console for testing
    User.findOne({email:email})
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({error: "Email already exist"});
        }
        const user = new User({name, email, password});
        user.save().then(() => {
            res.status(201).json({message: "User registered successfully"});
        }).catch((err) => res.status(500).json({error: "Failed to register"})); // if data is not saved
    }).catch(err => {console.log(err);});//if function is not working
    //res.json({message : req.body}); to print data in console for testing
});

module.exports = router;