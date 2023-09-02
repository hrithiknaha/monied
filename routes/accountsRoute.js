const router = require("express").Router();

const verifyQueryEnum = require("../middlewares/verifyQueryEnum");

const accountsController = require("../controllers/accountsController");

router.post("/add", accountsController.addAccount);
router.get("/:accountId", accountsController.getUserAccountDetails);
router.get("/", verifyQueryEnum, accountsController.getAllUserAccountDetails);

module.exports = router;
