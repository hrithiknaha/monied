const router = require("express").Router();

const repaymentsController = require("../controllers/repaymentsController");

router.post("/add", repaymentsController.addRepayment);
router.get("/", repaymentsController.getAllRepayment);
router.get("/:repaymentId", repaymentsController.getRepayment);

module.exports = router;
