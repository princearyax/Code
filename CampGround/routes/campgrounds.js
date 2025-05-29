const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const catchAsync = require("../utilities/catchAsync");  //wrapAsync fun
const ExpressError = require("../utilities/expressError");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn } = require("../middleware.js");

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(msg, 400);
    }else next();
}

router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", { campgrounds });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
});

router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if(!campground){
        req.flash("error","Can't find the campground");
        return res.redirect("/campgrounds");
    }
    console.log(campground);
    res.render("campgrounds/show.ejs", { campground });
    //for just one flash function but we're using middleware
    // res.render("campgrounds/show.ejs", { campground, flashMsg :req.flash("saved") });
}));
// router.get("/:id", async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.render("campgrounds/show.ejs", { campground });
// });

router.post("/", isLoggedIn, validateCampground, async (req, res, next) => {
    try {
        // if(!req.body.campground) {
        //     throw new ExpressError("Invalid Campground Data", 400);
        // }
        // const campgroundSchema = joi.object({ //not a mongoose schema
        //     campground: joi.object({
        //         title: joi.string().required(),
        //         price: joi.number().required().min(0),
        //         image: joi.string().required(),
        //         description: joi.string().required(),
        //         location: joi.string().required()
        //     }).required()
        // });
        // const {error} = campgroundSchema.validate(req.body);
        // console.log(error);
        // if (error) { 
        //     const msg = error.details.map(e => e.message).join(", ");
        //     console.log("meow error");
        //     // console.log(msg);
        //     throw new ExpressError(msg, 400);
        // }
        const campground = new Campground(req.body.campground);
        await campground.save();
        //adding flash function
        req.flash("saved","The camp is saved");
        res.redirect(`/campgrounds/${campground._id}`);
    }
    catch (e) {
        next(e);  //not requires in new express
    }
});

router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash("error","Can't find the campground");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit.ejs", { campground });
});

router.put("/:id", isLoggedIn, validateCampground, async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    req.flash("success","Successfully updated")
    res.redirect(`/campgrounds/${campground._id}`);
});

router.delete("/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted camp");
    res.redirect("/campgrounds");
});

module.exports = router;
