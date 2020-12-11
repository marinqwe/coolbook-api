const express = require("express");
const postRouter = express.Router();
const { post } = require("../controllers");
const authorize = require("../helpers/authorize");

postRouter.get("/", post.getAll);
postRouter.post("/", authorize, post.create);

postRouter.get("/:id", post.getPost);
postRouter.delete("/:id", authorize, post.deletePost);
postRouter.put("/:id", authorize, post.updatePost);

module.exports = postRouter;
