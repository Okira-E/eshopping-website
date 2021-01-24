"use strict";
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");

const Product = require("../models/products");
const User = require("../models/users");
const auth = require("../middleware/auth");
const { storage } = require("./users");

const router = new express.Router();
const deleteImageAsync = promisify(fs.unlink);

router.post(
    "/api/products/create",
    [auth, multer({ storage }).single("image")],
    async (req, res) => {
        const { email } = req.user;
        const { title, description, price, category } = req.body;

        const serverUrl = req.protocol + "://" + req.get("host");
        const imagePath = serverUrl + "/images/" + req.file.filename;

        try {
            await User.findAdminByEmail(email);
            await new Product({
                title,
                description,
                price,
                image: imagePath,
                category,
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
        await deleteImageAsync(
            req.body.image.replace("http://0.0.0.0:3200/", "./")
        );
        await Product.deleteOne({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get("/api/products/getProducts", auth, async (req, res) => {
    try {
        if (req.query.skip) {
            var products = await Product.find()
                .skip(parseInt(req.query.skip))
                .limit(12);
        } else {
            var products = await Product.find();
        }
        res.send(products);
    } catch {
        res.status(500).send();
    }
});

router.get("/api/products/getProductsByCategory", auth, async (req, res) => {
    try {
        // for (let category of categories) {
        //     let products = [];
        //     if ((req.query.category = category)) {
        //         let resultProduct = await Product.find({ category });
        //         products.push(resultProduct);
        //     }
        //     break;
        // }
        console.log(req.query.category);
        const products = await Product.find({ category: req.query.category });
        console.log(products);
        res.send(products);
    } catch {
        res.status(500).send();
    }
});

module.exports = router;
