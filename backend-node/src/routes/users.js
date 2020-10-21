const express = require("express");
const multer = require("multer");

const User = require("../models/users");
const auth = require("../middleware/auth");

const MIME_TYPES = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
};

const router = new express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPES[file.mimetype];
        let error = new Error("Invalid Mime-Type");
        if (isValid) {
            error = null;
        }
        callback(error, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + "-" + Date.now() + "." + extension);
    },
});

// POST REQUESTS ////////////////////////////////////////////////////////////////////

router.post("/api/users/register", async(req, res) => {
    try {
        const newUser = await new User({...req.body }).save();
        const token = await newUser.generateToken();
        res.status(201).send({ token });
    } catch (e) {
        res.status(500).send({ error: e });
    }
});

router.post("/api/admin/register", async(req, res) => {
    try {
        const newUser = await new User({...req.body, isAdmin: true }).save();
        const token = await newUser.generateToken();
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
        res.status(500).send("Unable to login");
    }
});

router.post("/api/admin/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findAdminByCredentials(email, password);
        const token = await user.generateToken();
        res.status(200).send({ token });
    } catch {
        res.status(500).send("Unable to login");
    }
});

router.post(
    "/api/users/updateprofilepicture", [auth, multer({ storage }).single("image")], async(req, res) => {
        const user = req.user;

        const serverUrl = req.protocol + "://" + req.get("host");
        const imagePath = serverUrl + "/images/" + req.file.filename;
        try {
            await User.updateOne({ _id: user._id }, {
                profilePic: imagePath,
            });
            await user.save();

            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
);

// GET /////////////////////////////////////////////////////////

router.get("/api/users/getdata", auth, (req, res) => {
    const user = req.user;

    try {
        res.status(200).send(user);
    } catch {
        res.status(500).send();
    }
});

router.get("/api/admin/validate", auth, async(req, res) => {
    const user = req.user;

    try {
        const admin = await User.findOne({_id: user._id, isAdmin: true});
        if (!admin) {
            throw new Error();
        }
        res.status(200).send({});
    } catch {
        res.status(403).send();
    } 
})

// PATCH /////////////////////////////////////////////////////////

router.patch("/api/users/updatepassword", auth, async(req, res) => {
    const user = req.user;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const isMatch = await User.findByCredentials(user.email, oldPassword);
        if (!isMatch) {
            throw new Error();
        }
        await user.updatePassword(newPassword);
        res.status(200).send();
    } catch {
        res.status(400).send();
    }
});

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