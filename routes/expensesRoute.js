const router = require("express").Router();

const expensesController = require("../controllers/expensesController");

router.post("/add", expensesController.addExpense);
router.get("/", expensesController.getAllExpenses);

module.exports = router;
