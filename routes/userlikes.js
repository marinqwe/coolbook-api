const express = require("express");
const userLikesRouter = express.Router();
const { userLikes } = require("../controllers");
const authorize = require("../helpers/authorize");

userLikesRouter.get("/test", userLikes.test);
userLikesRouter.post("/vote", userLikes.userVote);

module.exports = userLikesRouter;
