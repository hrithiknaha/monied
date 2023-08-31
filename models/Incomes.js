const mongoose = require("mongoose");

const incomesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        transaction_date: { type: Date, required: true },
    },
    { timeseries: true, timestamps: true }
);

module.exports = mongoose.model("Incomes", incomesSchema);
