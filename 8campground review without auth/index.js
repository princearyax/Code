const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const catchAsync = require("./utilities/catchAsync");  //wrapAsync fun
const ExpressError = require("./utilities/expressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const joi = require("joi");
const { campgroundSchema, reviewSchema } = require("./schemas.js"); //not a mongoose schema

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("MongoDB connection opened successfully");
});

const app = express();
const port = 3000;

app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// console.log(path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(msg, 400);
    }else next();
}
//review
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(msg, 400);
    }else next();
}

app.get("/", (req, res) => {
    res.render("home.ejs", { title: "Home" });
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    console.log(campground);
    res.render("campgrounds/show.ejs", { campground });
}));
// app.get("/campgrounds/:id", async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.render("campgrounds/show.ejs", { campground });
// });

app.post("/campgrounds", validateCampground, async (req, res, next) => {
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
        res.redirect(`/campgrounds/${campground._id}`);
    }
    catch (e) {
        next(e);  //not requires in new express
    }
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit.ejs", { campground });
});

app.put("/campgrounds/:id", validateCampground, async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
});

//review routes 
const Review = require("./models/review");  //mmm.. sud be at top , but just for reference
const { getDefaultSettings } = require("http2");
app.post("/campgrounds/:id/reviews", validateReview, async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${id}`);
});
app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

app.all(/.*/, (req, res, next) => {
    // res.status(404).send("Page not found");
    next(new ExpressError("Page not found this hits", 404));
});

app.use((err, req, res, next) => {
    // const { statusCode = 500, message = "Something..." } = err;
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Something went wrong"; 
    console.log("Error middleware started");
    console.log(err);
    console.log("Eroor middleware ended");
    res.status(statusCode).render("error", { err });
    // next(err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});