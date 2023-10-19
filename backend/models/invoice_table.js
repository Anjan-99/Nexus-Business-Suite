const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const invoicetableSchema = new mongoose.Schema ({
    invoice_id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_table',
        required: true,
    },
    invoice_number: {
        type: String,
        required: true,
    },
    cust_name: {
        type: String,
        required: true,
    },
    issue_date: {
        type: String,
        required: true
    },
    cust_phone: {
        type: String,
        required: true,
    },
    cust_email: {
        type: String,
        required: true,
    },
    cust_address: {
        type: String,
        required: true
    },
    res_name: {
        type: String,
        required: true
    },
    res_phone: {
        type: String,
        required: true,
    },
    res_email: {
        type: String,
        required: true,
    },
    res_address: {
        type: String,
        required: true
    },
    additional_info: {
        type: String,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    item_quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Invoice_table = mongoose.model("invoice_table", invoicetableSchema,"Invoice_table");
module.exports = Invoice_table;