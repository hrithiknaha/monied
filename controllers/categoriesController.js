const Categories = require("../models/Categories");
const Users = require("../models/Users");

const categoriesController = {
    addMonthlyCategory: async (req, res, next) => {
        try {
            const { name, start_date, end_date, month, year, categories } = req.body;

            const user = await Users.findOne({ username: req.user });

            console.log(req.body);

            // const monthCategory = new Categories.create({ name, start_date, end_date, month, year, categories });

            // user.Categories;
        } catch (error) {
            next(error);
        }
    },
};

module.exports = categoriesController;
