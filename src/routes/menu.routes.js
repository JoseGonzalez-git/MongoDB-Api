import { Router } from "express";
import * as menuCtrl from "../controllers/menu.controller";
const routerMenu = Router();

routerMenu.get("/", menuCtrl.getAllMenu);

routerMenu.get("/:id", menuCtrl.getItemFromMenuById);
routerMenu.put("/:id", menuCtrl.updateItemIntoMenu);

routerMenu.post("/product", menuCtrl.createItemOnMenu);
routerMenu.delete("/product/:id", menuCtrl.deleteItemMenu);

export default routerMenu;
