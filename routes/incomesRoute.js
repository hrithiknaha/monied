const router = require("express").Router();

const incomesController = require("../controllers/incomesController");

router.post("/add", incomesController.addIncome);
router.get("/", incomesController.getAllIncomes);
router.get("/:incomeId", incomesController.getIncomes);

module.exports = router;
