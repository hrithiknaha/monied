require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = require("./configs/db");

const authsRoute = require("./routes/authsRoute");
const accountsRoute = require("./routes/accountsRoute");
const incomesRoute = require("./routes/incomesRoute");
const expensesRoute = require("./routes/expensesRoute");

const verifyJWT = require("./middlewares/verifyJWT");

console.log("Running on ", process.env.NODE_ENV);

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authsRoute);
app.use("/api/accounts", verifyJWT, accountsRoute);
app.use("/api/incomes", verifyJWT, incomesRoute);
app.use("/api/expenses", verifyJWT, expensesRoute);

const PORT = process.env.PORT || 5001;

mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
