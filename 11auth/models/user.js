const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("User", userSchema);