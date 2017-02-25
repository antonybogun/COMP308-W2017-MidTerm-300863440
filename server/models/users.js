/*
 *   File-name: users.js
 *   Author's name: Tony Bogun   
 *   Student ID: 300863440
 *   Web-site name: comp308-300863440.herokuapp.com/
 */

// require these modules for user model
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display name is required'
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'users'
});

let options = ({
    missingPasswordError: "Wrong Password"
});

UserSchema.plugin(passportLocalMongoose, options);

// export UserSchema class to be available to import
exports.User = mongoose.model('User', UserSchema);