const router = require("express").Router();

const categoriesController = require("../controllers/categoriesController");

router.post("/add", categoriesController.addMonthlyCategory);
router.get("/", categoriesController.getAllMonthlyCategory);
router.get("/:categoryId", categoriesController.getMontlyCategory);

module.exports = router;
