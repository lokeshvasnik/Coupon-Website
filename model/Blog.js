const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    googleLink: { type: String },
    facebookLink: { type: String },
    imageLink: { type: String, required: true },
    twitterLink: { type: String },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Blog', Blog);
