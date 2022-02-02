import express from "express";
import authController from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter.route("/login").post(authController.signin);
authRouter.route("/logout").get(authController.signout);

export default authRouter;
