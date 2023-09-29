const Users = require("../models/Users");
const Accounts = require("../models/Accounts");

const accountsController = {
    addAccount: async (req, res, next) => {
        try {
            const { account_name, account_type, opening_balance, entity_name } = req.body;

            let account = null;

            if (account_type === "BANK") {
                account = await Accounts.create({
                    name: account_name,
                    type: account_type,
                    balance: opening_balance,
                    entity_name,
                });
            } else if (account_type === "CREDIT_CARD") {
                account = await Accounts.create({
                    name: account_name,
                    type: account_type,
                    credit_limit: opening_balance,
                    amount_due: 0,
                    entity_name,
                });
            }

            console.log(account);

            const user = await Users.findOne({ username: req.user });

            user.accounts.push(account._id);
            user.save();

            res.status(201).json({ status: true, status_message: "New account added.", account });
        } catch (error) {
            next(error);
        }
    },

    getUserAccountDetails: async (req, res, next) => {
        try {
            const { accountId } = req.params;

            const userAccounts = await Users.findOne({ username: req.user }).populate({
                path: "accounts",
                populate: [
                    { path: "incomes" },
                    { path: "expenses", populate: { path: "category" } },
                    { path: "repayments" },
                ],
            });

            const account = userAccounts.accounts.filter((account) => account.id === accountId)[0];

            res.status(200).json({ status: true, status_message: "Account Details", data: account });
        } catch (error) {
            next(error);
        }
    },

    getAllUserAccountDetails: async (req, res, next) => {
        try {
            let accounts = null;
            accounts = (await Users.findOne({ username: req.user }).populate("accounts")).accounts;

            if (req.query?.type) accounts = accounts.filter((account) => account.type === req.query.type);

            res.status(200).json({ status: true, status_message: "All Account Details", data: accounts });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = accountsController;
