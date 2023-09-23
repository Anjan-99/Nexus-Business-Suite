const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    try {
        let gentoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: gentoken });
        await this.save();
        return token;
    } catch (err){
        console.log(err);
    }
}

const User = mongoose.model("USER", userSchema,"Users");
module.exports = User;