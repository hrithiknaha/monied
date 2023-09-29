const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        transaction_date: { type: Date, required: true },
        categoryTitle: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expenses", expenseSchema);
