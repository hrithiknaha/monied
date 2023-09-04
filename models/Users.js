const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accounts" }],
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    },
    { timeseries: true, timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
