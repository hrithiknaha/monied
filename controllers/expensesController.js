const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Expenses = require("../models/Expenses");

const expensesController = {
    addExpense: async (req, res, next) => {
        try {
            const { name, amount, date, account_id } = req.body;

            const userAccounts = await Users.findOne({ username: req.user }).populate("accounts");

            const account = userAccounts.accounts.filter((account) => account.id === account_id);

            if (account.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Account associated with that account id." });

            const accountObj = await Accounts.findById(account_id);

            const expense = await Expenses.create({ name, amount, transaction_date: date });

            accountObj.expenses.push(expense._id);

            if (accountObj.type === "BANK") accountObj.balance -= amount;
            else if (accountObj.type === "CREDIT_CARD") accountObj.amount_due += amount;

            await accountObj.save();

            res.status(201).json({ status: true, status_message: "Expense Added", data: expense });
        } catch (error) {
            next(error);
        }
    },

    getAllExpenses: async (req, res, next) => {
        try {
            const user = await Users.findOne({ username: req.user })
                .populate({
                    path: "accounts",
                    populate: { path: "expenses" },
                })
                .lean();

            const aggregatedExpenses = user.accounts.flatMap((account) => {
                return account.expenses.map((expense) => {
                    return {
                        account: {
                            _id: account._id,
                            account_name: account.name,
                            account_type: account.type,
                            account_entity_name: account.entity_name,
                        },
                        ...expense,
                    };
                });
            });

            res.status(200).json({ status: true, status_message: "All expenses Details", data: aggregatedExpenses });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = expensesController;
