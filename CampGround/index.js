const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); //wrapAsync fun
const ExpressError = require("./utilities/expressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //in info.txt

const campgroundsRoute = require("./routes/campgrounds");
const reviewRoute = require("./routes/reviews");

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
//serving static files
app.use(express.static(path.join(__dirname,"public")));


//review


app.get("/", (req, res) => {
    res.render("home.ejs", { title: "Home" });
});

app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:id/reviews", reviewRoute);


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