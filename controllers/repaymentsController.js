const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Expenses = require("../models/Expenses");
const Repayments = require("../models/Repayments");

const repaymentsController = {
    addRepayment: async (req, res, next) => {
        try {
            const { name, amount, date, account_id, repayment_account_id } = req.body;

            const userAccounts = await Users.findOne({ username: req.user }).populate("accounts");

            const account = userAccounts.accounts.filter((account) => account.id === account_id);

            const repaymentAccount = userAccounts.accounts.filter((account) => account.id === repayment_account_id);

            if (account.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No account associated with that account id." });

            if (repaymentAccount.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No repayment account associated with that account id." });

            const accountObj = await Accounts.findById(account_id);
            const repaymentObj = await Accounts.findById(repayment_account_id);

            const expense = await Expenses.create({ name, amount, transaction_date: date });
            const repayment = await Repayments.create({ name, amount, transaction_date: date });

            accountObj.expenses.push(expense._id);
            accountObj.balance -= amount;

            repaymentObj.repayments.push(repayment._id);
            repaymentObj.amount_due -= amount;

            await accountObj.save();
            await repaymentObj.save();

            res.status(201).json({ status: true, status_message: "Expense Added", data: { expense, repayment } });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = repaymentsController;
