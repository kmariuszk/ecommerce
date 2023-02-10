const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please add a title!'],
        unique: true,
    },
    description: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);