const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Incomes = require("../models/Incomes");

const incomesController = {
    addIncome: async (req, res, next) => {
        try {
            const { name, amount, date, account_id } = req.body;

            const userAccounts = await Users.findOne({ username: req.user }).populate("accounts");

            const account = userAccounts.accounts.filter((account) => account.id === account_id);

            if (account.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Account associated with that account id." });

            const accountObj = await Accounts.findById(account_id);

            const income = await Incomes.create({ name, amount, transaction_date: date });

            accountObj.incomes.push(income._id);
            accountObj.balance += amount;

            await accountObj.save();

            res.status(201).json({ status: true, status_message: "Income Added", data: income });
        } catch (error) {
            next(error);
        }
    },

    getAllIncomes: async (req, res, next) => {
        try {
            const user = await Users.findOne({ username: req.user })
                .populate({
                    path: "accounts",
                    populate: { path: "incomes" },
                })
                .lean();

            const aggregatedIncomes = user.accounts.flatMap((account) => {
                return account.incomes.map((income) => {
                    return {
                        account: {
                            _id: account._id,
                            account_name: account.name,
                            account_type: account.type,
                            account_entity_name: account.entity_name,
                        },
                        ...income,
                    };
                });
            });

            res.status(200).json({ status: true, status_message: "All incomes Details", data: aggregatedIncomes });
        } catch (error) {
            next(error);
        }
    },

    getIncomes: async (req, res, next) => {
        try {
            const { incomesId } = req.params;

            const user = await Users.findOne({ username: req.user })
                .populate({
                    path: "accounts",
                    populate: { path: "incomes" },
                })
                .lean();

            const aggregatedIncomes = user.accounts.flatMap((account) => {
                return account.incomes
                    .filter((incomes) => {
                        return incomes._id.toString() === incomesId;
                    })
                    .map((income) => {
                        return {
                            account: {
                                _id: account._id,
                                account_name: account.name,
                                account_type: account.type,
                                account_entity_name: account.entity_name,
                            },
                            ...income,
                        };
                    });
            });

            res.status(200).json({ status: true, status_message: "All incomes Details", data: aggregatedIncomes });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = incomesController;
