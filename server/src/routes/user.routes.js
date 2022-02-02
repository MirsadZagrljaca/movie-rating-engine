import userController from "../controllers/user.controller";
import express from "express";

const userRouter = express.Router();

userRouter.route("/user").get(userController.list);
userRouter.route("/user/register").post(userController.create);

export default userRouter;