const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        categories: { type: Array, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
    },
    { timeseries: true, timestamps: true }
);

module.exports = mongoose.model("Categories", categorySchema);
