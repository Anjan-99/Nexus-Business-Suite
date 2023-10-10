const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const expresstableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    expenses: {
        type: String,
        required: true,
    },
    vendor_name: {
        type: String,
        required: true,
    },
    mode_of_payment: {
        type: String,
        required: true
    },
    customer_name: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    }
})

const Express_table = mongoose.model("express_table", expresstableSchema,"Express_table");
module.exports = Express_table;