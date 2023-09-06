const router = require("express").Router();

const usersController = require("../controllers/usersController");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

router.get("/:username", verifyAuthorization, usersController.getUser);

module.exports = router;
