const express = require("express");
const commentRouter = express.Router();
const { comment } = require("../controllers");
const authorize = require("../helpers/authorize");

commentRouter.get("/", comment.getAll);

module.exports = commentRouter;
