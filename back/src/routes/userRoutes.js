const { addUser, login } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", addUser);
userRouter.post("/login", login);

module.exports = userRouter;