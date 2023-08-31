const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Expenses = require("../models/Expenses");

const expensesController = {
    addExpense: async (req, res, next) => {
        try {
            const { name, amount, date, account_id } = req.body;

            const account = await Accounts.findById(account_id);

            if (!account)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Account associated with that account id." });

            const expense = await Expenses.create({ name, amount, transaction_date: date });

            account.expenses.push(expense._id);
            account.balance -= amount;

            await account.save();

            res.status(201).json({ status: true, status_message: "Expense Added", expense });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = expensesController;
