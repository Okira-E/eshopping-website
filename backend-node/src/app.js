const express = require("express");
const cors = require("cors");

require("./db/mongo");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}`);
});