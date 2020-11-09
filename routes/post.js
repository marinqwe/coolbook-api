const express = require("express");
const postRouter = express.Router();
const { post } = require("../controllers");
const authorize = require("../helpers/authorize");

postRouter.get("/test", authorize, post.testRoute);
postRouter.get("/all", post.getAll);
postRouter.post("/add", authorize, post.create);

postRouter.get("/:id", post.getPost);
postRouter.delete("/:id", post.deletePost);
postRouter.put("/:id", post.updatePost);

module.exports = postRouter;
