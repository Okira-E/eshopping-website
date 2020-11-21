const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            required: true,
            type: String,
            maxlength: 150,
            trim: true,
        },
        price: {
            required: true,
            type: Number,
        },
        description: {
            required: true,
            type: String,
            maxlength: 1400,
        },
        image: {
            required: true,
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
