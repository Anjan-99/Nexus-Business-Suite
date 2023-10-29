const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeetableSchema = new mongoose.Schema ({
    employeeid: {
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
    position: {
        type: String,
        required: true,
    },
})

const Employeetable = mongoose.model("employee_table", employeetableSchema,"Employeetable");
module.exports = Employeetable;