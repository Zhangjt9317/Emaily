// create mongoose user class
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String,
});

// create a model in mongodb using mongoose
mongoose.set('useNewUrlParser', true);
mongoose.model('users', userSchema);