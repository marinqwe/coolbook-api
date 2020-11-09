const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");
const userLikesRouter = require("./userlikes");

router.get("/", function (req, res) {
  res.status(200).send("Hi");
});

router.use("/api/user", userRouter);
router.use("/api/post", postRouter);
router.use("/api/likes", userLikesRouter);

module.exports = router;
