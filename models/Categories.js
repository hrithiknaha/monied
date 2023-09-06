const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
        categories: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categories", categoriesSchema);
