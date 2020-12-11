const express = require("express");
const commentRouter = express.Router();
const { comment } = require("../controllers");
const authorize = require("../helpers/authorize");

commentRouter.get("/:id", comment.getAll);
commentRouter.post("/", authorize, comment.create);
commentRouter.delete("/:id", authorize, comment.delete);

module.exports = commentRouter;
