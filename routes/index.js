const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");
const userLikesRouter = require("./userlikes");

router.use("/api/user", userRouter);
router.use("/api/post", postRouter);
router.use("/api/like", userLikesRouter);

module.exports = router;
