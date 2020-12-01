const express = require("express");
const userRouter = express.Router();
const { user } = require("../controllers");
const upload = require("../services/uploadImage");
const authorize = require("../helpers/authorize");

userRouter.get("/me", authorize, user.getUser);
userRouter.get("/logout", authorize, user.logout);
userRouter.post("/register", upload.single("userImg"), user.register);
userRouter.post("/login", user.login);
userRouter.put("/update", authorize, upload.single("userImg"), user.update);

module.exports = userRouter;
