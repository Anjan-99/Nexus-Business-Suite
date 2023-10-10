const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const paymenttableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    customer_name: {
        type: String,
        required: true,
    },
    invoice_number: {
        type: String,
        required: true,
    },
    mode_of_payment: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    unused_amount: {
        type: Number,
        required: true
    }
})

const Payment_table = mongoose.model("payment_table", paymenttableSchema,"Payment_table");
module.exports = Payment_table;