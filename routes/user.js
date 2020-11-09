const express = require("express");
const userRouter = express.Router();
const { user } = require("../controllers");
const upload = require("../services/uploadImage");
const authorize = require("../helpers/authorize");

userRouter.get("/post", authorize, user.testAuth);
userRouter.get(
  "/me",
  authorize,
  user.getUser
);
userRouter.post("/register", upload.single("userImg"), user.register);
userRouter.post("/login", user.login);
userRouter.get("/logout", authorize, user.logout);
userRouter.post("/upload", upload.single("userImg"), user.imgTest);

module.exports = userRouter;
