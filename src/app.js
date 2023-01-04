//CONFIG SERVER
import express from "express";
import morgan from "morgan";
// Routes
import IndexRouter from "./routes/index.routes";
import routerMenu from "./routes/menu.routes";
import authRoutes from "./routes/auth.routes";

import pkg from "../package.json";
import { createdRoles } from "./libs/initialSetup";
import userRouter from "./routes/user.routes";
const app = express();
createdRoles(); //solo se ejecuta si no hay roles.
//variable- valor
app.set("port", process.env.PORT || 3000);
app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());
//Routes
app.use("/api/v1", IndexRouter);
app.use("/api/v1/menu", routerMenu);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRouter);

export default app;
