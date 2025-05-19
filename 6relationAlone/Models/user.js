const mongoose = require('mongoose');
//one to few
mongoose.connect('mongodb://localhost:27017/relation')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addresses: [
        {
            _id: false,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);

const createUser = async (name, addresses) => {
    const user = new User({ name, addresses });
    try {
        const res = await user.save(); 
        console.log('User created:', res);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createUser('Arya ko', [
    { city: 'New York', state: 'NY', country: 'USA' },
    { city: 'Munger', state: 'BR', country: 'IN' }
]);

const addAddress = async (userId, address) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return;
        }
        user.addresses.push(address);
        const res = await user.save();
        console.log('Address added:', res);
    } catch (error) {
        console.error('Error adding address:', error);
    }
}


module.exports = { User };
