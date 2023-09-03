const router = require("express").Router();

const repaymentsController = require("../controllers/repaymentsController");

router.post("/add", repaymentsController.addRepayment);

module.exports = router;
