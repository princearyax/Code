module.exports.isLoggedIn = (req, res, next) => {
    console.log("The user: ", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must Login');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(msg, 400);
    }else next();
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash("error","Can't find the campground");
        return res.redirect("/campgrounds");
    }
    next();
}
// module.exports = isLoggedIn;