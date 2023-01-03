import { Router } from "express";
import * as menuCtrl from "../controllers/menu.controller";
import { verifyToken } from "../middlewares";

const routerMenu = Router();

routerMenu.get("/", verifyToken, menuCtrl.getAllMenu);

routerMenu.get("/:id", verifyToken, menuCtrl.getItemFromMenuById);
routerMenu.put("/:id", verifyToken, menuCtrl.updateItemIntoMenu);

routerMenu.post("/product", verifyToken, menuCtrl.createItemOnMenu);
routerMenu.delete("/product/:id", verifyToken, menuCtrl.deleteItemMenu);

export default routerMenu;
