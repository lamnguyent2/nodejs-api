const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const Users = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        password: {
            type: String
        },
        gender: {
            type: String
        },
        picture: {
            type: String
        },
        Role: {
            type: Number
        },
        phone_number: {
            type: String
        },
        address: {
            type: String
        },
        slug: { 
            type: String, 
            slug: 'fullName', 
            unique: true 
        }
    },
    {
        timestamps: true,
    }
);
Users.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', Users);