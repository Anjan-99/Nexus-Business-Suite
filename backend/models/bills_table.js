const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const billstableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    bill: {
        type: String,
        required: true,
    },
    vendor_name: {
        type: String,
        required: true,
    },
    due_date: {
        type: String,
        required: true,
    },
    bill_date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
})

const Bills_table = mongoose.model("bills_table", billstableSchema,"Bills_table");
module.exports = Bills_table;