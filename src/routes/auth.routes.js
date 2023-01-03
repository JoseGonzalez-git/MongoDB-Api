import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRoutes = new Router();

authRoutes.post("/signin", signIn);
authRoutes.post("/signup", signUp);

export default authRoutes;
