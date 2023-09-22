const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String,
})

userSchema.pre("save", async function(next){
    console.log("testing");
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 12);
    }
    next();
})

const User = mongoose.model("USER", userSchema,"Users");
module.exports = User;