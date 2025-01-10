const { addUser, login, getAllUser, getUserById } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", addUser);
userRouter.post("/login", login);
userRouter.get("/:id", getUserById);

module.exports = userRouter;