const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customeraddtableSchema = new mongoose.Schema ({
    customerid: {
        type: String,
        required: true,
        primarykey: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    business_type: {
        type: String,
        required: true
    },
    email: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
})

const Customeraddtable = mongoose.model("customeradd_table", customeraddtableSchema,"Customeraddtable");
module.exports = Customeraddtable;