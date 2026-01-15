const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', productSchema);




