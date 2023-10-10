const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const invoicetableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    invoice_id: {
        type: String,
        required: true,
    },
    customer_id: {
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
    issue_date: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true,
    },
    total_amount: {
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