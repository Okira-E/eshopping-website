const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: true,
            type: String,
            maxlength: 30,
            trim: true,
        },
        lastName: {
            required: true,
            type: String,
            maxlength: 30,
            trim: true,
        },
        email: {
            required: true,
            unique: true,
            type: String,
            maxlength: 255,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            required: true,
            type: String,
            maxlength: 150,
            trim: true,
            validate(value) {
                if (value.length < 8) {
                    throw new Error("Password too short");
                }
            },
        },
        profilePic: {
            required: false,
            type: String,
        },
        tokens: [
            {
                token: {
                    required: true,
                    type: String,
                },
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login!");
    }

    return user;
};

userSchema.statics.findAdminByCredentials = async (email, password) => {
    const user = await User.findOne({ email, isAdmin: true });

    if (!user) {
        throw new Error("Unable to login!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login!");
    }

    return user;
};

userSchema.statics.findAdminByEmail = async email => {
    const user = await User.findOne({ email, isAdmin: true });

    if (!user) {
        throw new Error("Unable to login!");
    }

    return user;
};

userSchema.methods.generateToken = async function () {
    const token = jwt.sign(
        { id: this._id.toString() },
        "rf3'ip2weifr2w3qho'o;*)Y{HO}][fp3:2]|",
        {
            expiresIn: "4 days",
        }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

userSchema.methods.updatePassword = async function (password) {
    this.password = password;
    await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
