const express = require("express");
const router = express.Router();
require("../db/conn.js");
const Customertable = require("../models/customer_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/customer_table", async (req, res) => {
    const { customerid, firstname, lastname, email, phone, address } = req.body;
    try { 
        const customer_table = new Customertable({ customerid, firstname, lastname, email, phone, address });
        const customer_tabledetails =  await customer_table.save();
        if (customer_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});


module.exports = router;