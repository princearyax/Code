const express = require("express");
const path = require("path");
const app = express();
const User = require("./models/user")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

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
const sessionConfig  = {
    secret : "thisShouldBeBetterSecret",
    resave: false,
    saveUninitialized: true,
    //can specify store:mongo or somtn
    cookie : {
        httpOnly: true,
        // expires: Date.now()+1000*60*60,//in ms
        // maxAge: 1000*60*60
    }
};
app.use(session(sessionConfig));

const requireLogin = (req, res, next)=>{
    if(!req.session.user_id){
        return res.redirect("/login");
    }
    next()
}


app.get("/", (req, res)=>{
    res.send("huh.........."); 
});
app.get("/register", (req, res)=>{
    res.render("register");
});
app.post("/register", async (req, res)=>{
    const { username, password } = req.body;
    const user = await new User({username, password}).save();
    req.session.user_id = user._id;
    //one is lo , lo
    res.redirect("/");
});

app.get("/login", (req, res)=>{
    res.render("login"); 
});
app.post("/login", async (req, res)=>{
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);
    console.log(user);
    if(!user){
        return res.send("some error"); //dont't tell whats teh error
    }else{
        req.session.user_id = user._id;
        console.log(req.session.user_id);
        res.send("corrrect");
    }
});

app.post("/logout", (req, res) => {
    req.session.user_id = null;
    // req.session.destroy(); //for destroying the session entirely
    res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res)=>{
    console.log(req.session.user_id);
    // if(!req.session.user_id){
    //     return res.redirect("/login");
    // }else
    res.render("secret"); 
});

app.listen(3000, ()=>{
    console.log("Runnnig at 3000");
})