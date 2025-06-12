const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random50 = Math.floor(Math.random() * 50);
        const camp = new Campground({
            location: `${cities[random50].city}, ${cities[random50].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
            price: Math.floor(Math.random() * 20) + 100,
            author: "68373651143d1dbb9a1ac629",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnmguhtpt/image/upload/v1749654264/Yelp-camp/lcnhjbjbvviaj3whlbvo.png',
                    filename: 'Yelp-camp/lcnhjbjbvviaj3whlbvo',
                    _id: ObjectId('68499afd879acaa5316515f8')
                },
                {
                    url: 'https://res.cloudinary.com/dnmguhtpt/image/upload/v1749654264/Yelp-camp/zzmnldqhh03awy1s7elo.png',
                    filename: 'Yelp-camp/zzmnldqhh03awy1s7elo',
                    _id: ObjectId('68499afd879acaa5316515f9')
                },
                {
                    url: 'https://res.cloudinary.com/dnmguhtpt/image/upload/v1749654265/Yelp-camp/nxe7ttlr7v9s2ihdk7eb.png',
                    filename: 'Yelp-camp/nxe7ttlr7v9s2ihdk7eb',
                    _id: ObjectId('68499afd879acaa5316515fa')
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})



// image: `https://picsum.photos/400/300`