const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        opening_balance: { type: Number, required: true },
        balance: { type: Number, required: true, default: 0 },
        entity_name: { type: String, required: true },
        expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }],
        incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Incomes" }],
        repayments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Repayments" }],
    },
    { timeseries: true, timestamps: true }
);

module.exports = mongoose.model("Accounts", accountSchema);
