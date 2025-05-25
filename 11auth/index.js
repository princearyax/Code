const express = require("express");
const path = require("path");
const app = express();
const User = require("./models/user")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost:27017/temp")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res)=>{
    res.send("huh.........."); 
});
app.get("/register", (req, res)=>{
    res.render("register");
});
app.post("/register", async (req, res)=>{
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({
        username,
        password:hash
    }).save();
    //one is lo , lo
    res.redirect("/");
});

app.get("/login", (req, res)=>{
    res.render("login"); 
});
app.post("/login", async (req, res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user){
        res.send("some error"); //dont't tell whats teh error
    }else{
        const validPass = await bcrypt.compare(password, user.password);
        if(validPass){
            res.send("corrrect");

        }else{
            res.send("some error");
        }
    }
});

app.listen(3000, ()=>{
    console.log("Runnnig at 3000");
})