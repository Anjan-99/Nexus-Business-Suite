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
const Vendorcredit_table = require("../models/vendorcredit_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//delete invoice from database
router.post("/invoice_delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try { 
        const invoice_table = await Invoice_table.findByIdAndRemove(id).exec();
        if (invoice_table){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

module.exports = router;