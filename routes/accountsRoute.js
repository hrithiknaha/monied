const router = require("express").Router();

const accountsController = require("../controllers/accountsController");

router.post("/add", accountsController.addAccount);

module.exports = router;
