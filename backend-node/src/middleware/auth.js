const User = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Token ", "");
        const requester = jwt.verify(
            token,
            "rf3'ip2weifr2w3qho'o;*)Y{HO}][fp3:2]|"
        );
        const user = await User.findOne({
            id: requester._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch {
        res.status(401).send({
            error: "Please make sure you are authenticated",
        });
    }
};

module.exports = auth;