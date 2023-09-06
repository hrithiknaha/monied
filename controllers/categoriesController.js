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

    getAllMonthlyCategory: async (req, res, next) => {
        try {
            const user = await Users.findOne({ username: req.user });

            const categories = user.categories;

            res.status(201).json({ status: true, status_message: "Category Added", data: categories });
        } catch (error) {
            next(error);
        }
    },

    getMontlyCategory: async (req, res, next) => {
        try {
            const { categoryId } = req.params;
            const user = await Users.findOne({ username: req.user });

            const category = user.categories.filter((category) => category.id === categoryId);

            res.status(201).json({ status: true, status_message: "Category Added", data: category });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = categoriesController;
