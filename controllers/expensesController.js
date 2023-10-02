const Users = require("../models/Users");
const Accounts = require("../models/Accounts");
const Expenses = require("../models/Expenses");
const Categories = require("../models/Categories");

const expensesController = {
    addExpense: async (req, res, next) => {
        try {
            const { name, amount, date, category_name, account_id, category_id } = req.body;

            const userAccounts = await Users.findOne({ username: req.user }).populate("accounts categories");

            const account = userAccounts.accounts.filter((account) => account.id === account_id);
            const userCategory = userAccounts.categories.filter((category) => category.id === category_id);

            if (account.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Account associated with that account id." });

            if (userCategory.length === 0)
                return res
                    .status(400)
                    .json({ status: false, status_message: "No Category associated with that category id." });

            const expense = await Expenses.create({
                name,
                amount,
                transaction_date: date,
                categoryTitle: category_name,
                category: category_id,
            });

            userCategory[0].categories.map((cat) => {
                if (cat.title === category_name) {
                    cat.amountUsed += amount;
                    cat.expenses.push(expense._id);
                }
            });

            await Categories.findByIdAndUpdate(category_id, {
                $set: {
                    categories: userCategory[0].categories,
                },
            });

            const accountObj = await Accounts.findById(account_id);
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
                    populate: {
                        path: "expenses",
                        populate: {
                            path: "category",
                        },
                    },
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

    getExpense: async (req, res, next) => {
        try {
            const { expenseId } = req.params;

            const user = await Users.findOne({ username: req.user })
                .populate({
                    path: "accounts",
                    populate: {
                        path: "expenses",
                        populate: {
                            path: "category",
                        },
                    },
                })
                .lean();

            const aggregatedExpense = user.accounts.flatMap((account) => {
                return account.expenses
                    .filter((expense) => {
                        return expense._id.toString() === expenseId;
                    })
                    .map((expense) => {
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

            res.status(200).json({ status: true, status_message: "All expenses Details", data: aggregatedExpense });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = expensesController;
