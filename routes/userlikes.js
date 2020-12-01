const express = require("express");
const userLikesRouter = express.Router();
const { userLikes } = require("../controllers");
const authorize = require("../helpers/authorize");
const verifyRoles = require("../helpers/verifyRoles");

userLikesRouter.get("/", userLikes.getAll);
userLikesRouter.post("/", authorize, verifyRoles(["user"]), userLikes.userVote);

module.exports = userLikesRouter;
