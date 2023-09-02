const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Incomes = require("../models/Incomes");

const incomesController = {
    addIncome: async (req, res, next) => {
        try {
            const { name, amount, date, account_id } = req.body;

            const account = await Accounts.findById(account_id);

            if (!account)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Account associated with that account id." });

            const income = await Incomes.create({ name, amount, transaction_date: date });

            account.incomes.push(income._id);
            account.balance += amount;

            await account.save();

            res.status(201).json({ status: true, status_message: "Income Added", data: income });
        } catch (error) {
            next(error);
        }
    },

    getAllIncomes: async (req, res, next) => {
        try {
            const user = await Users.findOne({ username: req.user }).populate({
                path: "accounts",
                populate: { path: "incomes" },
            });

            const aggregatedIncomes = [];

            user.accounts.forEach((account) => {
                const accountDetails = {
                    account: account._id,
                    account_name: account.name,
                    account_type: account.type,
                    account_entity_name: account.entity_name,
                };

                const incomes = account.incomes.map((income) => {
                    return {
                        ...accountDetails,
                        _id: income._id,
                        income_name: income.name,
                        income_amount: income.amount,
                        income_transaction_date: income.transaction_date,
                        income_createdAt: income.createdAt,
                        income_updatedAt: income.updatedAt,
                    };
                });

                aggregatedIncomes.push(...incomes);
            });

            res.status(200).json({ status: true, status_message: "All incomes Details", data: aggregatedIncomes });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = incomesController;
