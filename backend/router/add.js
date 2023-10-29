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
const Employee_table = require("../models/employee_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//invoice add to database
router.post("/invoice_add", async (req, res) => {
    const { issue_date ,customer_id ,cust_name, cust_phone, cust_email,cust_address, res_name, res_phone, res_email, res_address, item_name, item_quantity, total_amount, additional_info,status} = req.body;
    const invoice_id  = Math.floor(Math.random() * 100) + 1;
    const invoice_number = "#"+invoice_id;
    try { 
        const invoice_table = new Invoice_table({ invoice_id, customer_id, invoice_number, cust_name, issue_date, cust_phone, cust_email, cust_address, res_name, res_phone, res_email, res_address, additional_info, total_amount, item_name, item_quantity, status});
        const invoice_tabledetails =  await invoice_table.save();
        if (invoice_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//quote add to database
router.post("/quote_add", async (req, res) => {
    const { customer_id,cust_name,  quote_number, quote_date, valid_until,item_name,total_amount,additional_info} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    const status = "paid";
    try { 
        const quotes_table = new Quotes_table({ id, customer_id,cust_name, quote_number, quote_date, valid_until,item_name, total_amount,additional_info, status});
        const quotes_tabledetails =  await quotes_table.save();
        if (quotes_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//payment record add to database
router.post("/payment_add", async (req, res) => {
    const { customer_name,invoice_number,mode_of_payment,date,amount,unused_amount} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    try { 
        const payment_table = new Payment_table({ id, date, customer_name, invoice_number, mode_of_payment,amount,unused_amount});
        const payment_tabledetails =  await payment_table.save();
        if (payment_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//vendor add to database
router.post("/vendor_add", async (req, res) => {
    const { name, company_name, email, payable_amount, unused_credit} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    try { 
        const vendor_table = new Vendor_table({ id, name, company_name, email, payable_amount, unused_credit});
        const vendor_tabledetails =  await vendor_table.save();
        if (vendor_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//add espenses table to database
router.post("/expenses_add", async (req, res) => {
    const {date, expenses, vendor_name, mode_of_payment, customer_name, item} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    try { 
        const expenses_table = new Expenses_table({ id, date, expenses, vendor_name, mode_of_payment, customer_name, item});
        const expenses_tabledetails =  await expenses_table.save();
        if (expenses_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//add bills table to database
router.post("/bills_add", async (req, res) => {
    const { bill, vendor_name, due_date, bill_date, amount} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    const status = "paid";
    try { 
        const bills_table = new Bills_table({ id, bill, vendor_name, due_date, bill_date, amount,status});
        const bills_tabledetails =  await bills_table.save();
        if (bills_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//vendor credit add to database
router.post("/vendorcredit_add", async (req, res) => {
    const { name, company_name, email, payment_amount, unused_credit} = req.body;
    const id  = Math.floor(Math.random() * 1000) + 1;
    const status = "paid";
    try { 
        const vendorcredit_table = new Vendorcredit_table({ id, name, company_name, email, payment_amount, unused_credit,status});
        const vendorcredit_tabledetails =  await vendorcredit_table.save();
        if (vendorcredit_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

//add employee to database
router.post("/employee_add", async (req, res) => {
    const { firstname,lastname,position,email,phone,salary,} = req.body;
    const employeeid  = Math.floor(Math.random() * 1000) + 1;
    try { 
        const employee_table = new Employee_table({ employeeid, firstname, lastname, email, phone, position});
        const employee_tabledetails =  await employee_table.save();
        if (employee_tabledetails){
            res.status(201).json({ message: "successfully" });
        } else {
            res.status(400).json({ message: "unsuccessfully" });
        }
    } catch (err){
        console.log(err);
    }
});

module.exports = router;