const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const expensestableSchema = new mongoose.Schema ({
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
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
})

const Expenses_table = mongoose.model("express_table", expensestableSchema,"Expenses_table");
module.exports = Expenses_table;