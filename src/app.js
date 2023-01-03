//CONFIG SERVER
import express from "express";
import morgan from "morgan";
// Routes
import IndexRouter from "./routes/index.routes";
import routerMenu from "./routes/menu.routes";

import pkg from "../package.json";
const app = express();
//variable- valor
app.set("port", process.env.PORT || 3000);
app.set("pkg", pkg);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", IndexRouter);
app.use("/api/v1/menu", routerMenu);

export default app;
