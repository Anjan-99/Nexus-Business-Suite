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
const Customer_table = require("../models/customer_table.js");
const Employee_table = require("../models/employee_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//delete invoice from database
router.delete("/invoice/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const invoice_table = await Invoice_table.findByIdAndDelete(id);
    if (invoice_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete quotes from database
router.delete("/quotes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const quotes_table = await Quotes_table.findByIdAndDelete(id);
    if (quotes_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete payment from database
router.delete("/payment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const payment_table = await Payment_table.findByIdAndDelete(id);
    if (payment_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete vendor from database
router.delete("/vendor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const vendor_table = await Vendor_table.findByIdAndDelete(id);
    if (vendor_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete expenses from database
router.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expenses_table = await Expenses_table.findByIdAndDelete(id);
    if (expenses_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete bills from database
router.delete("/bills/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bills_table = await Bills_table.findByIdAndDelete(id);
    if (bills_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete vendorcredit from database
router.delete("/vendorcredit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const vendorcredit_table = await Vendorcredit_table.findByIdAndDelete(id);
    if (vendorcredit_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});



//delete customer from database
router.delete("/customer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer_table = await Customer_table.findByIdAndDelete(id);
    if (customer_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete employee from database
router.delete("/employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee_table = await Employee_table.findByIdAndDelete(id);
    if (employee_table) {
      res.status(200).json({ message: "successfully" });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
