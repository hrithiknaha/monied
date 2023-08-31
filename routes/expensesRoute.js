const router = require("express").Router();

const expensesController = require("../controllers/expensesController");

router.post("/add", expensesController.addExpense);

module.exports = router;
