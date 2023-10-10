const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customertableSchema = new mongoose.Schema ({
    customerid: {
        type: String,
        required: true,
        primarykey: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    comapanyname: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    }
})

const Customertable = mongoose.model("customer_table", customertableSchema,"Customertable");
module.exports = Customertable;