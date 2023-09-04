const router = require("express").Router();

const categoriesController = require("../controllers/categoriesController");

router.post("/add", categoriesController.addMonthlyCategory);

module.exports = router;
