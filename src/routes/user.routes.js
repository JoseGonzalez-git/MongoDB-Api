import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { isAdmin, verifyToken } from "../middlewares/authjwt";
import { checkDuplicateUsernameOrEmail, checkRolesExists } from "../middlewares/verifySignup";
const userRouter = Router();

userRouter.post("/", [verifyToken, isAdmin,checkDuplicateUsernameOrEmail, checkRolesExists ], createUser);
export default userRouter;
