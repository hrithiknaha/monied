require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const connectDB = require("./configs/db");
const corsOptions = require("./configs/corsOptions");

const authsRoute = require("./routes/authsRoute");
const accountsRoute = require("./routes/accountsRoute");
const incomesRoute = require("./routes/incomesRoute");
const expensesRoute = require("./routes/expensesRoute");
const repaymentsRoute = require("./routes/repaymentsRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const usersRoute = require("./routes/usersRoute");

const errorHandler = require("./middlewares/errorHandler");
const verifyJWT = require("./middlewares/verifyJWT");

console.log("Running on ", process.env.NODE_ENV);

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authsRoute);
app.use("/api/accounts", verifyJWT, accountsRoute);
app.use("/api/incomes", verifyJWT, incomesRoute);
app.use("/api/expenses", verifyJWT, expensesRoute);
app.use("/api/repayments", verifyJWT, repaymentsRoute);
app.use("/api/categories", verifyJWT, categoriesRoute);
app.use("/api/users", verifyJWT, usersRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
