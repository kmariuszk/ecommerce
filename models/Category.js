const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageLink: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);