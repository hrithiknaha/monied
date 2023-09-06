const Users = require("../models/Users");

const usersController = {
    getUser: async (req, res, next) => {
        try {
            const { username } = req.user;

            console.log(username);

            const user = await Users.findOne({ username }).select("-password").populate("accounts categories");

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
