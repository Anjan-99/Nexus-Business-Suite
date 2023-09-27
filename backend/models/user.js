const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
<<<<<<< HEAD
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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
=======
    name: String,
    email: String,
    password: String,
>>>>>>> parent of da0b2ce (JBT)
})

userSchema.pre("save", async function(next) {
    console.log("Hi from inside");
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

<<<<<<< HEAD
userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err){
        console.log(err);
    }
}

=======
>>>>>>> parent of da0b2ce (JBT)
const User = mongoose.model("USER", userSchema,"Users");
module.exports = User;