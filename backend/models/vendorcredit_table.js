const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorcredittableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    payment_amount: {
        type: String,
        required: true
    },
    unused_credit: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const vendorcredit_table = mongoose.model("Vendor_credit_table", vendorcredittableSchema,"Vendor_credit_table");
module.exports = vendorcredit_table;