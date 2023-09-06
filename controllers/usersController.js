const Users = require("../models/Users");

const usersController = {
    getUser: async (req, res, next) => {
        try {
            const user = await Users.findOne({ username: req.user })
                .select("-password")
                .populate({
                    path: "accounts",
                    populate: { path: "expenses incomes repayments" },
                })
                .populate("categories");

            res.status(200).json({
                status: true,
                status_message: "User Details",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = usersController;
