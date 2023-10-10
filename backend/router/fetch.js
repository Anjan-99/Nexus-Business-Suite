const express = require("express");
const router = express.Router();
require("../db/conn.js");
const User = require("../models/user.js");
const Invoice_table = require("../models/invoice_table.js");
const Quotes_table = require("../models/quotes_table.js");
const Payment_table = require("../models/payment_table.js");
const Vendor_table = require("../models/vendor_table.js");
const Expenses_table = require("../models/expenses_table.js");
const Bills_table = require("../models/bills_table.js");
const Customertable = require("../models/customer_table.js");
const vendorcredit_table = require("../models/vendorcredit_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//fetch user data from database and display it on the frontend
//Fetch
router.get("/fetchuser", async (req, res) => {
    try {
        const userFetch = await User.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});
//invoice fetch
router.get("/fetchinvoice", async (req, res) => {
    try {
        const userFetch = await Invoice_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//quote fetch
router.get("/fetchquote", async (req, res) => {
    try {
        const userFetch = await Quotes_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//payment record fetch
router.get("/fetchpayment", async (req, res) => {
    try {
        const userFetch = await Payment_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//vendor fetch
router.get("/fetchvendor", async (req, res) => {
    try {
        const userFetch = await Vendor_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//expenses fetch
router.get("/fetchexpenses", async (req, res) => {
    try {
        const userFetch = await Expenses_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//bill fetch
router.get("/fetchbill", async (req, res) => {
    try {
        const userFetch = await Bills_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//vendor credit fetch
router.get("/fetchvendorcredit", async (req, res) => {
    try {
        const userFetch = await vendorcredit_table.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

//customer fetch
router.get("/fetchcustomer", async (req, res) => {
    try {
        const userFetch = await Customertable.find();
        res.json(userFetch);
        
    } catch (err){
        console.log(err);
    }
});

module.exports = router;