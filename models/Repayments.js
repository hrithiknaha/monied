const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        transaction_date: { type: Date, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Repayments", repaymentSchema);
