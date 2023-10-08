const express = require("express");
const router = express.Router();
require("../db/conn.js");
const Customers = require("../models/customers.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/customers", async (req, res) => {
    const { customerid, firstname, lastname, email, phone, address } = req.body;
    try { 
        const customers = new Customers({ customerid, firstname, lastname, email, phone, address });
        const customersdetails =  await customers.save();
        if (customersdetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});


module.exports = router;