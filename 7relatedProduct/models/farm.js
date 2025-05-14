const mongoose = require('mongoose');
const Product = require('./product'); // Import the Product model
const {Schema} = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm name is required"]    
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});
//defining a post middleware to delete all products associated with a farm
//this is a query middleware, not a document middleware
//instead of callin next cam use async/etc
farmSchema.pre('findOneAndDelete', async function (farm) {
    console.log("Farm ", farm);  //no acces to the farm
});  
farmSchema.post('findOneAndDelete', async function (farm) {
    console.log("Farm after:", farm);
    if (farm.products.length) {
        await Product.deleteMany({ _id: { $in: farm.products } });
        console.log("Deleted products associated with farm:", farm.products);
    }
});

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;