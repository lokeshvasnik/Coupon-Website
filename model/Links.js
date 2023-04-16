const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: true },
    code: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    affiliate: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
