const mongoose = require("mongoose");

mongoose
    .connect("mongodb://mongo:27017/primary", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection with MongoDB has been established!");
    })
    .catch(error => {
        console.log("Connection Failed with ", error);
    });