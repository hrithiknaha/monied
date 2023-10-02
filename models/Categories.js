const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    amountUsed: { type: Number, required: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }],
});

const categoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
        categories: [expenseSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categories", categoriesSchema);
