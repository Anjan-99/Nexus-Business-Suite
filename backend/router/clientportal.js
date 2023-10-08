const express = require("express");
const router = express.Router();
require("../db/conn.js");
const Clientportal = require("../models/clientportal.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/clientportal", async (req, res) => {
    const { portalid, customerid, portalurl } = req.body;
    try { 
        const clientportal = new Clientportal({ portalid, customerid, portalurl });
        const clientportaldetails =  await clientportal.save();
        if (clientportaldetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

module.exports = router;