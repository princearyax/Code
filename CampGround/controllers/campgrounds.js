const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new.ejs");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash("error","Can't find the campground");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit.ejs", { campground });
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    }).populate("author");
    console.log("campground when camp/id hit in routess"+campground);
    if(!campground){
        req.flash("error","Can't find the campground");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show.ejs", { campground });
    //for just one flash function but we're using middleware
    // res.render("campgrounds/show.ejs", { campground, flashMsg :req.flash("saved") });
};

module.exports.createCampground = async (req, res, next) => {
    try {
        // const campgroundSchema = joi.object({ //not a mongoose schema
        //     campground: joi.object({
        //         title: joi.string().required(),
        //         price: joi.number().required().min(0),
        //         image: joi.string().required(),
        //         description: joi.string().required(),
        //         location: joi.string().required()
        //     }).required()
        // });
        const campground = new Campground(req.body.campground);
        campground.images = req.files.map(f => ({url: f.path, filename : f.filename}));
        campground.author = req.user._id;
        await campground.save();
        //adding flash function
        req.flash("saved","The camp is saved");
        res.redirect(`/campgrounds/${campground._id}`);
    }
    catch (e) {
        next(e);  //not requires in new express
    }
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    const imgs = req.files.map(f => ({url: f.path, filename : f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash("success","Successfully updated")
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted camp");
    res.redirect("/campgrounds");
};