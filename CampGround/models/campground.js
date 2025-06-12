const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// https://res.cloudinary.com/dnmguhtpt/image/upload/w_200/v1749646370/Yelp-camp/ske3uwjk67qjomimmarb.png


const ImageSchema = new Schema(
    {
        url: String,
        filename: String
    }
);
ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
    title:{
        type: String
    },
    price : Number,
    description : String,
    location : String,
    images: [ImageSchema],
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});
//triggered by findByIdAndDelete
CampgroundSchema.post("findOneAndDelete", async(doc)=>{
     if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
     }
});

module.exports = mongoose.model("Campground", CampgroundSchema);