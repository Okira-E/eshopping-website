const express = require("express");
const path = require("path");
const cors = require("cors");

require("./db/mongo");
const { router } = require("./routes/users");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(productRoutes);
app.use("/images", express.static(path.join("images")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}`);
});
