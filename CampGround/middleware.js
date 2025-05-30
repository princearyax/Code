module.exports.isLoggedIn = (req, res, next) => {
    console.log("The user: ", req.user);
    if (!req.isAuthenticated()) {
        req.flash("error", "You must login");
        return res.redirect("/login");
    }
    next();
}

// module.exports = isLoggedIn;