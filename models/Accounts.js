const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        entity_name: { type: String, required: true },
        balance: { type: Number },
        credit_limit: { type: Number },
        amount_due: { type: Number },
        expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }],
        incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Incomes" }],
        repayments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Repayments" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Accounts", accountSchema);
