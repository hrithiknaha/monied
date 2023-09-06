const router = require("express").Router();

const usersController = require("../controllers/usersController");

router.get("/:username", usersController.getUser);

module.exports = router;
