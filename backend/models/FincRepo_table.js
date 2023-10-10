const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const FincRepotableSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
    },
    report_type: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
})

const FincRepo_table = mongoose.model("fincrepo_table", FincRepotableSchema,"FincRepo_table");
module.exports = FincRepo_table;