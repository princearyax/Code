const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("users/register");
});
router.post("/register", catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        console.log(registerUser);
        req.flash("success", "Welcome to yelpcamp");
        res.redirect("/campgrounds");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login");
});
router.post("/login", passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}), (req, res) => { //passport middleware
    // const { email, username, password } = req.body; noneed
    req.flash("success", "Welcome, back!");
    res.redirect("/campgrounds");
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out!');
        res.redirect('/campgrounds');
    });
}); 

module.exports = router;