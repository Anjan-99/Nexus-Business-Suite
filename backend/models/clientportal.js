const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const clientportalSchema = new mongoose.Schema ({
    portalid: {
        type: String,
        required: true,
        primarykey: true,
    },
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true,
    },
    portalurl: {
        type: String,
        required: true,
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

const Clientportal = mongoose.model("clientportal", clientportalSchema,"Clientportal");
module.exports = Clientportal;