const express = require("express");
const userLikesRouter = express.Router();
const { userLikes } = require("../controllers");
const authorize = require("../helpers/authorize");

userLikesRouter.get("/", userLikes.getAll);
userLikesRouter.post("/", authorize, userLikes.userVote);

module.exports = userLikesRouter;
