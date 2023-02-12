import Category from './Category';
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
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            isAsync: true,
            validator: async function (value) {
                console.log("Validating")
                const category = await Category.findById(value);
                return category;
            },
            message: 'Invalid Category ObjectId'
        }
    }],
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