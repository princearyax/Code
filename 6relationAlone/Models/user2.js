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


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true  
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post' //tells which model to use for population
        }
    ]
}); 

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

Post.insertMany([
    { title: 'Dance', content: 'Lets nacho!' },
    { title: 'Post 2', content: 'Content of Post 2' },
    { title: 'Post 3', content: 'Content of Post 3' }
]);

const createUser = async () => {
    const user = new User({ name: 'Arya ko' });
    const post1 = await Post.findOne({ title: 'Dance' });
    const post2 = await Post.findOne({ title: 'Post 2' });
    // user.posts.push(post1); // works too
    user.posts.push(post1._id);
    await user.save();
    console.log(user)
    // try {
    //     user.posts.push(post1._id);
    //     user.posts.push(post2._id);
    //     const res = await user.save(); 
    //     console.log('User created:', res);
    // } catch (error) {
    //     console.error('Error creating user:', error);
    // }
}

// createUser();

const addPost = async () => {
    const user = await User.findOne({ name: 'Arya ko' });
    const post = await Post.findOne({ title: 'Post 3' });
    if (!user || !post) {
        console.log('User or Post not found');
        return;
    }else{
        user.posts.push(post._id);
        await user.save();
        console.log('Post added:', post);
    }
}
// addPost();

User.findOne({ name: 'Arya ko' })
.then(user => {
    if (!user) {
        console.log('User not found');
        return;
    }
    return user.populate("posts"); 
    // return User.populate(user, { path: 'posts' }); 
})
.then(user => {
    console.log('User with populated posts:', user);
})

module.exports = { User};
