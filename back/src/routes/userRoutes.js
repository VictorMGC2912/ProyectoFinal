const { addUser, login, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", addUser);
userRouter.post("/login", login);
userRouter.put('/:id', updateUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;