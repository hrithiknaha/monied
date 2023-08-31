const router = require("express").Router();

const authsController = require("../controllers/authsController");

router.post("/register", authsController.registerUser);
router.post("/login", authsController.loginUser);
// router.get("/refresh", authsController.refreshUser);
router.get("/logout", authsController.logoutUser);

module.exports = router;
