const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const quotestableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_table',
        required: true,
    },
    cust_name: {
        type: String,
        required: true,
    },
    quote_number: {
        type: String,
        required: true,
    },
    quote_date: {
        type: String,
        required: true
    },
    valid_until: {
        type: String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    total_amount: {
        type: String,
        required: true
    },
    additional_info: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    
})

const Quotes_table = mongoose.model("quotes_table", quotestableSchema,"Quotes_table");
module.exports = Quotes_table;