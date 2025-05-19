const mongoose = require('mongoose');
const {Schema} = mongoose;
//one to many
mongoose.connect('mongodb://localhost:27017/relation')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const userSchema = new Schema({
    name: {
        type: String,
        required: true  
    },
    age: Number
    
}); 

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' //tells which model to use for population
    }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

const makePosts = async () => {
    const user = new User({name: 'John', age: 20});
    const p1 = new Post({title: 'Post 1', content: 'Content 1'});
    // const p2 = new Post({title: 'Post 2', content: 'Content 2'});
    p1.user = user;
    await user.save();
    await p1.save(); 
}

// makePosts();

const makePosts2 = async () => {
    const user = await User.findOne({name: 'John'}); //use await otherwise returns query
    if (!user) {
        console.log('User not found');
        return;
    }
    const p2 = new Post({title: 'Post 2', content: 'Content 2'});
    p2.user = user;
    await p2.save(); 
    console.log('Post 2 saved');
}

// makePosts2();

const findPosts = async () => {
    const posts = await Post.find({}).populate('user', 'age');
    console.log(posts);
}
findPosts();