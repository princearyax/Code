const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Username can't be blank"]
    },
    password:{
        type: String,
        required: [true, "Password can't be blank"]
    }
});

userSchema.statics.findAndValidate = async function(username, password){
    const foundUser = await this.findOne({ username });
    if(!foundUser){
        console.log("oo")
        return false;
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    // if(!isValid) return false;
    console.log("jo")
    return isValid?foundUser : false;
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); //willtell if modified, y/n
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model("User", userSchema);