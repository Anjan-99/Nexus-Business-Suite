const express = require("express");
const router = express.Router();
require("../db/conn.js");
const Customertable = require("../models/customer_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/customer_add", async (req, res) => {
    const { firstname, lastname,comapanyname, businessType, email, phone, address } = req.body;
    customerid = Math.floor(Math.random() * 1000);
    try { 
        const customer_table = new Customertable({ customerid, firstname, lastname, email, phone, address ,comapanyname, businessType });
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