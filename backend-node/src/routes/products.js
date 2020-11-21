const express = require("express");
const multer = require("multer");

const Product = require("../models/products");
const User = require("../models/users");
const auth = require("../middleware/auth");
const { storage } = require("./users");

const router = new express.Router();

router.post(
    "/api/products/create",
    [auth, multer({ storage }).single("image")],
    async (req, res) => {
        const { email } = req.user;
        const { title, description, price } = req.body;

        const serverUrl = req.protocol + "://" + req.get("host");
        const imagePath = serverUrl + "/images/" + req.file.filename;

        try {
            await User.findAdminByEmail(email);
            await new Product({
                title,
                description,
                price,
                image: imagePath,
            }).save();

            res.status(201).send();
        } catch (err) {
            console.log(err);
            res.status(403).send();
        }
    }
);

router.post("/api/products/delete", auth, async (req, res) => {
    try {
        await Product.deleteOne({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        });
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get("/api/products/getProducts", auth, async (req, res) => {
    try {
        const products = await Product.find()
            .skip(parseInt(req.query.skip))
            .limit(12);
        res.send(products);
    } catch {
        res.status(500).send();
    }
});

module.exports = router;
