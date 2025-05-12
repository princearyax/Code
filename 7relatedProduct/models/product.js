const mongoose = require('mongoose');
const Farm = require('./farm');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        enum: ['fruit','dairy','fast'],
    },
    farm:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;