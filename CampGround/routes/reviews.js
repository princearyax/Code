const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review");
const Campground = require("../models/campground");
const catchAsync = require("../utilities/catchAsync");  //wrapAsync fun
const ExpressError = require("../utilities/expressError");
const { reviewSchema } = require("../schemas.js");


const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(msg, 400);
    }else next();
}

router.post("/", validateReview, async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    console.log(campground);
    console.log(req.body);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success","Successfully created review");
    res.redirect(`/campgrounds/${id}`);
});
router.delete("/:reviewId", catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully deleted review");
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;