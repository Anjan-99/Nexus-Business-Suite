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
const Vendorcredit_table = require("../models/vendorcredit_table.js");
const Employee_table = require("../models/employee_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.put("/invoicerecupdate/:id", async (req, res) => {
  const { id } = req.params;
  const {status } = req.body;
  console.log(status);
  try {
    const invoice_table = await Invoice_table.findByIdAndUpdate(id, {
      status: status,
    });
    if (invoice_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/customerupdate", async (req, res) => {
  const { id,firstname,lastname,companyname, businessType, email, phone, address } = req.body;
  try {
    const customer_table = await Customertable.findByIdAndUpdate(id, {
      firstname: firstname,
      lastname: lastname,
      companyname: companyname,
      businessType: businessType,
      email: email,
      phone: phone,
      address: address,
    });
    if (customer_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//invoice update
router.put("/invoiceupdate", async (req, res) => {
  const {
    id,
    cust_name,
    issue_date,
    cust_phone,
    cust_email,
    cust_address,
    res_name,
    res_phone,
    res_email,
    res_address,
    additional_info,
    total_amount,
    item_name,
    item_quantity,
    status,
  } = req.body;
  try {
    const invoice_table = await Invoice_table.findByIdAndUpdate(id, {
      cust_name: cust_name,
      issue_date: issue_date,
      cust_phone: cust_phone,
      cust_email: cust_email,
      cust_address: cust_address,
      res_name: res_name,
      res_phone: res_phone,
      res_email: res_email,
      res_address: res_address,
      additional_info: additional_info,
      total_amount: total_amount,
      item_name: item_name,
      item_quantity: item_quantity,
      status: status,
    });
    if (invoice_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//quote update
router.put("/quoteupdate", async (req, res) => {
  const {
    id,
    cust_name,
    issue_date,
    cust_phone,
    cust_email,
    cust_address,
    res_name,
    res_phone,
    res_email,
    res_address,
    additional_info,
    total_amount,
    item_name,
    item_quantity,
    status,
  } = req.body;
  try {
    const quotes_table = await Quotes_table.findByIdAndUpdate(id, {
      cust_name: cust_name,
      issue_date: issue_date,
      cust_phone: cust_phone,
      cust_email: cust_email,
      cust_address: cust_address,
      res_name: res_name,
      res_phone: res_phone,
      res_email: res_email,
      res_address: res_address,
      additional_info: additional_info,
      total_amount: total_amount,
      item_name: item_name,
      item_quantity: item_quantity,
      status: status,
    });
    if (quotes_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//payment update
router.put("/paymentupdate", async (req, res) => {
  const {
    id,
    date,
    customer_name,
    invoice_number,
    mode_of_payment,
    amount,
  } = req.body;
  try {
    const payment_table = await Payment_table.findByIdAndUpdate(id, {
      date: date,
      customer_name: customer_name,
      invoice_number: invoice_number,
      mode_of_payment: mode_of_payment,
      amount: amount,
    });
    if (payment_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//employee update
router.put("/employeeupdate", async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    email,
    phone,
    position,
  } = req.body;
  try {
    const user = await Employee_table.findByIdAndUpdate(id, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      position: position,
    });
    if (user) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//vendor update
router.put("/vendorupdate", async (req, res) => {
  const {
    id,
    name,
    company_name,
    email,
    payable_amount,
    unused_credit,
  } = req.body;
  try {
    const vendor_table = await Vendor_table.findByIdAndUpdate(id, {
      name: name,
      company_name: company_name,
      email: email,
      payable_amount: payable_amount,
      unused_credit: unused_credit,
    });
    if (vendor_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//expenses update
router.put("/expensesupdate", async (req, res) => {
  const {
    id,
    expenses,
    vendor_name,
    mode_of_payment,
    customer_name,
    item,
  } = req.body;
  try {
    const expenses_table = await Expenses_table.findByIdAndUpdate(id, {
      expenses: expenses,
      vendor_name: vendor_name,
      mode_of_payment: mode_of_payment,
      customer_name: customer_name,
      item: item,
    });
    if (expenses_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//bills update
router.put("/billsupdate", async (req, res) => {
  const {
    id,
    bill,
    vendor_name,
    amount,
    status,
  } = req.body;
  try {
    const bills_table = await Bills_table.findByIdAndUpdate(id, {
      bill: bill,
      vendor_name: vendor_name,
      amount: amount,
      status: status,
    });
    if (bills_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;