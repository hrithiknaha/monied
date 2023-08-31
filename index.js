require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = require("./configs/db");

console.log("Running on ", process.env.NODE_ENV);

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5001;

mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
