const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title!'],
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    imagesLinks: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);