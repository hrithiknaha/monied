const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        transaction_date: { type: Date, required: true },
        category: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expenses", expenseSchema);
