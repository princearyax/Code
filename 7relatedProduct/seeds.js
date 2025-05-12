//a file to seed data into the database
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/activity', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
        console.error('MongoDB connection error:', err);
    });

// const p = new Product({
//     name: 'banana',
//     price: 7,
//     category: 'fruit'
// });
// p.save()
//     .then((data) => {
//         console.log('Product saved!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error saving product:', err);
//     });

Product.insertMany([
    { name: 'banana', price: 7, category: 'fruit' },
    { name: 'milk', price: 3, category: 'dairy' },
    { name: 'pizza', price: 10, category: 'fast' },
    { name: 'apple', price: 5, category: 'fruit' },
    { name: 'cheese', price: 4, category: 'dairy' },
    { name: 'burger', price: 8, category: 'fast' },
    { name: 'orange', price: 6, category: 'fruit' },
    { name: 'yogurt', price: 2, category: 'dairy' },
    { name: 'fries', price: 3, category: 'fast' },
])
    .then((data) => {
        console.log('Products saved!');
        console.log(data);
    })
    .catch(err => {
        console.log('Error saving products:', err);
    });


