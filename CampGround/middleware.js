
const Campground = require("./models/campground");
const { campgroundSchema } = require("./schemas.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log("The user inside middleware isLogin: ", req.user);
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
    console.log("campground in isAuthor middleware"+ campground);
    console.log("req.user in isAuthor middleware"+req.user);
    if(!campground.author.equals(req.user._id)){
        console.log("id not macth in is Author middleware");
        req.flash("error","Access denied");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
// module.exports = isLoggedIn;