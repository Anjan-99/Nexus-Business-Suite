const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customersSchema = new mongoose.Schema ({
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
        type: number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
})

const Customers = mongoose.model("customers", customersSchema,"Customers");
module.exports = Customers;