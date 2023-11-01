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
const Employee_table = require("../models/employee_table.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//fetch user data from database and display it on the frontend
//Fetch
router.get("/fetchuser", async (req, res) => {
  try {
    const userFetch = await User.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//find invoice details
router.post("/invoice_find", async (req, res) => {
  const { invoice_id } = req.body;
  try {
    const invoice_tabledetails = await Invoice_table.find({
      invoice_id,
    }).populate("customer_id");
    if (invoice_tabledetails) {
      res.status(201).json({ message: "successfully", invoice_tabledetails });
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//invoice fetch
router.get("/fetchinvoice", async (req, res) => {
  try {
    const userFetch = await Invoice_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//quote fetch
router.get("/fetchquote", async (req, res) => {
  try {
    const userFetch = await Quotes_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//payment record fetch
router.get("/fetchpayment", async (req, res) => {
  try {
    const userFetch = await Payment_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//filter payment record fetch
router.get("/filterpayment", async (req, res) => {
  //fetch invoice details and check if the invoice is paid or not and only display the unpaid invoices
  try {
    const userFetch = await Invoice_table.find();
    const unpaid_invoices = userFetch.filter(
      (Invoice_table) => Invoice_table.status === "unpaid"
    );
    //get all name form upaid invoices and store it in an array
    const unpaid_invoices_name = unpaid_invoices.map(
      (Invoice_table) => Invoice_table.cust_name
    );
    res.json(unpaid_invoices);
  } catch (err) {
    console.log(err);
  }
});

//vendor fetch
router.get("/fetchvendor", async (req, res) => {
  try {
    const userFetch = await Vendor_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//expenses fetch
router.get("/fetchexpenses", async (req, res) => {
  try {
    const userFetch = await Expenses_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//bill fetch
router.get("/fetchbill", async (req, res) => {
  try {
    const userFetch = await Bills_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//vendor credit fetch
router.get("/fetchvendorcredit", async (req, res) => {
  try {
    const userFetch = await vendorcredit_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//customer fetch
router.get("/fetchcustomer", async (req, res) => {
  try {
    const userFetch = await Customertable.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//fetch customer by id
router.get("/customer_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer_tabledetails = await Customertable.findById(id);
    if (customer_tabledetails) {
      res.json(customer_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch invoice by id
router.get("/invoice_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const invoice_tabledetails = await Invoice_table.findById(id);
    if (invoice_tabledetails) {
      res.json(invoice_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch address from invoice table
router.get("/invoice_find_address", async (req, res) => {
  try {
    const userFetch = await Invoice_table.find();
    const countryTotals = {};

    userFetch.forEach((invoice) => {
      const country = invoice.res_address;

      if (!countryTotals[country]) {
        countryTotals[country] = 0;
      }

      countryTotals[country] += Number(invoice.total_amount);
    });
    const countryTotalsData = Object.entries(countryTotals).map(
      ([country, totalAmount]) => ({
        country,
        totalAmount,
      })
    );
    res.json(countryTotalsData);
  } catch (err) {
    console.log(err);
  }
});

//fetch quote by id
router.get("/quote_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quote_tabledetails = await Quotes_table.findById(id);
    if (quote_tabledetails) {
      res.json(quote_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch payment by id
router.get("/payment_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const payment_tabledetails = await Payment_table.findById(id);
    if (payment_tabledetails) {
      res.json(payment_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch employee by id
router.get("/employee_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee_tabledetails = await Employee_table.findById(id);
    if (employee_tabledetails) {
      res.json(employee_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch vendor by id
router.get("/vendor_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vendor_tabledetails = await Vendor_table.findById(id);
    if (vendor_tabledetails) {
      res.json(vendor_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch expenses by id
router.get("/expenses_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expenses_tabledetails = await Expenses_table.findById(id);
    if (expenses_tabledetails) {
      res.json(expenses_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//fetch bill by id
router.get("/bill_find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bill_tabledetails = await Bills_table.findById(id);
    if (bill_tabledetails) {
      res.json(bill_tabledetails);
    } else {
      res.status(400).json({ message: "unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//employee fetch
router.get("/fetchemployee", async (req, res) => {
  try {
    const userFetch = await Employee_table.find();
    res.json(userFetch);
  } catch (err) {
    console.log(err);
  }
});

//fetch invoice and get total amount of all invoices
router.get("/fetchinvoiceamount", async (req, res) => {
  try {
    const userFetch = await Invoice_table.find();
    //its doing concate i want to add all the total_amount
    const total = 0;
    const cashflow = userFetch.reduce(
      (total, Invoice_table) => total + Number(Invoice_table.total_amount),
      0
    );
    //total expense
    const userFetch1 = await Expenses_table.find();
    const expense = userFetch1.reduce(
      (total, Expenses_table) => total + Number(Expenses_table.expenses),
      0
    );
    const data = {
      cashflow,
      expense,
    };
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//fetch vendor and customer total count and send to fronmtend
router.get("/fetchvendorcustomer", async (req, res) => {
  try {
    const userFetch = await Vendor_table.find();
    const vendorcount = userFetch.length;
    const userFetch1 = await Customertable.find();
    const customercount = userFetch1.length;
    const data = {
      vendorcount,
      customercount,
    };
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
