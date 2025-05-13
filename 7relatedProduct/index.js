const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));

//farm routes

app.get('/farms', async (req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index', { farms });
});
app.get('/farms/new', (req, res) => {
  res.render('farms/new');
});
app.get('/farms/:id', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate('products');
  res.render('farms/show', { farm });
});
app.post('/farms', async (req, res) => {
  // res.send(req.body);
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect('/farms');
});



//Product routes

const categories = ["fruit", "dairy", "fast"];

app.get('/arya', (req, res) => {
  res.send('holaaaa');
});

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if(category && categories.includes(category)){
    const products = await Product.find({category:category});
    res.render('products/index', { products, categories ,x:category});
    return;
  }
  const products = await Product.find({});
  res.render('products/index', { products, categories ,x:"all" });
});

app.get('/products/new', (req,res) => {
  res.render('products/new', { category:categories });
})


app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect('/products');
});

app.get('/products/:id', async(req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id); //findOne{_id: id});
  res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); 
  res.render('products/edit', { p:product , category:categories });
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, { runValidators: true , new: true });
  res.redirect(`/products/${id}`);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
} );

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
