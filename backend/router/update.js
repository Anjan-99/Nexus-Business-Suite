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

router.put("/invoicerecupdate/:id", async (req, res) => {
  const { id } = req.params;
  const {status, updateamt } = req.body;
  console.log(status);
  try {
    const invoice_table = await Invoice_table.findByIdAndUpdate(id, {
      status: status,
      total_amount: updateamt,
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

module.exports = router;