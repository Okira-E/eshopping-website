const express = require("express");

const Product = require("../models/products");
const User = require("../models/users");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post(
    "/api/products/create",
    [auth, multer({ storage }).single("image")],
    async (req, res) => {
        const email = req.user.email;
        const { title, description, price } = req.body;

        const serverUrl = req.protocol + "://" + req.get("host");
        const imagePath = serverUrl + "/images/" + req.file.filename;

        try {
            await User.findAdminByEmail({ email });
            await new Product({
                title,
                description,
                price,
                image: imagePath,
            }).save();

            res.status(201).send();
        } catch {
            res.status(403).send();
        }
    }
);
