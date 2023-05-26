import { Router } from "express";
import loginUser from "../../server/controllers/userControllers/userControllers.js";
import { validate } from "express-validation";
import loginSchema from "../../schemas/loginSchema/loginSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
