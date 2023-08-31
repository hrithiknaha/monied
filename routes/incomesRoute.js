const router = require("express").Router();

const incomesController = require("../controllers/incomesController");

router.post("/add", incomesController.addIncome);

module.exports = router;
