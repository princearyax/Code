//different thing

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

const mongoose = require('mongoose');


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Connected to MongoDB!');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number
})

const Movie = mongoose.model('Movie', movieSchema);

const a1 = new Movie({ title: 'The Matrix', year: 1999 });
a1.save();

Movie.insertMany([
  { title: 'The Matrix Reloaded', year: 2003 },
  { title: 'The Matrix Revolutions', year: 2003 },
  { title: 'The Matrix Resurrections', year: 2021 },
  { title: 'The Matrix: Path of Neo', year: 2005 },
  { title: 'The Matrix Online', year: 2005 },
  { title: 'The Matrix: The Complete Illustrated Screenplay', year: 2003 },
  { title: 'The Matrix: The Art of the Film', year: 1999 },
  { title: 'The Matrix: The Complete Guide', year: 1999 },
]).then((data) => {
  console.log('Movies inserted!');
  console.log(data);
}
);

main().catch(err => console.log(err));