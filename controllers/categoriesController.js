const Categories = require("../models/Categories");
const Users = require("../models/Users");

const categoriesController = {
    addMonthlyCategory: async (req, res, next) => {
        try {
            const { name, start_date, end_date, month, year, categories } = req.body;

            const user = await Users.findOne({ username: req.user });

            const monthCategory = await Categories.create({ name, start_date, end_date, month, year, categories });

            user.categories.push(monthCategory._id);
            user.save();

            res.status(201).json({ status: true, status_message: "Category Added", data: monthCategory });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = categoriesController;
