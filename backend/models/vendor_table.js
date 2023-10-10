const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendortableSchema = new mongoose.Schema ({
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
    payable_amount: {
        type: Number,
        required: true
    },
    unused_credit: {
        type: Number,
        required: true
    }
})

const Vendor_table = mongoose.model("vendor_table", vendortableSchema,"Vendor_table");
module.exports = Vendor_table;