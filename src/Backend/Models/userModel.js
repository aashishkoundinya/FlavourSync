const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return !/\s/.test(v);
            },
            message: props => `${props.value} should not contain spaces`
        }
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
