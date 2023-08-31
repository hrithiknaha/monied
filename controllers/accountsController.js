const Users = require("../models/Users");
const Accounts = require("../models/Accounts");

const accountsController = {
    addAccount: async (req, res, next) => {
        try {
            const { account_name, account_type, opening_balance, entity_name } = req.body;

            const account = await Accounts.create({
                name: account_name,
                type: account_type,
                opening_balance,
                entity_name,
            });

            const user = await Users.findOne({ username: req.user });

            user.accounts.push(account._id);
            user.save();

            res.status(201).json({ status: true, status_message: "New account added.", account });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = accountsController;
