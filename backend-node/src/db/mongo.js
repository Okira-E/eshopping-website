const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection with MongoDB has been established!");
  })
  .catch((error) => {
    console.log("Connection Failed with ", error);
  });

