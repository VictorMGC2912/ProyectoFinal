const { addUser } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", addUser);

module.exports = userRouter;