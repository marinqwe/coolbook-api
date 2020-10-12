const express = require("express");
const router = express.Router();
const { user } = require("../controllers");
const passport = require("passport");

router.post("/register", user.register);
router.post("/login", user.login);
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  user.testAuth
);

module.exports = router;
