const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        maxlength: 30,
        trim: true,
    },
    description: {
        required: false,
        type: String,
        maxlength: 400,
    },
    price: {
        required: true,
        type: Number,
    },
}, {
    timestamps: true,
});