const mongoose = require('mongoose');
// const {User:User1} = require('./user');
const {User:User2} = require('./user2');
// const {User:User3} = require('./user3');

mongoose.connect('mongodb://localhost:27017/relation')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

helper = async (Model) => {
    try{
        await Model.collection.drop();
        console.log('Collection dropped');
    }
    catch (error) {
        if (error.code !== 26) { // 26 is the error code for "ns not found"
            console.error('Error dropping collection:', error);
        } else {
            console.log('Collection does not exist');
        }
    }
}
const deleteAll = async (Model) => {
    try {
        const res = await Model.deleteMany({});
        console.log('All documents deleted:', res);
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
    helper(Model);
}

// deleteAll(User1);
deleteAll(User2);
// deleteAll(User3);
// deleteAll(User4);