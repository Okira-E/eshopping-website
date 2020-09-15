const express = require("express");

const User = require("../models/users");
const auth = require("../middleware/auth");

const router = new express.Router();

// POST REQUESTS ////////////////////////////////////////////////////////////////////

router.post("/api/users/register", async(req, res) => {
    try {
        const newUser = await new User({...req.body }).save();
        const token = await newUser.generateToken();
        console.log(token);
        res.status(201).send({ token });
    } catch (e) {
        res.status(500).send({ error: e });
    }
});

router.post("/api/users/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateToken();
        res.status(200).send({ token });
    } catch {
        res.status(400).send("Unable to login");
    }
})

// DELETE REQUESTS ///////////////////////////////////////////////////////////////////
router.delete("/api/users/me", auth, async(req, res) => {
    const user = req.user;

    try {
        await User.deleteOne(user);
        res.status(200).send();
    } catch {
        res.status(500).send();
    }
});

module.exports = router;