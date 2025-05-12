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

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;