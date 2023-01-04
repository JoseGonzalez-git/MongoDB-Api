import { Router } from "express";
import * as menuCtrl from "../controllers/menu.controller";
import { isAdmin, verifyToken } from "../middlewares/authjwt";

const routerMenu = Router();

routerMenu.get("/", [verifyToken], menuCtrl.getAllMenu);

routerMenu.get("/:id", [verifyToken], menuCtrl.getItemFromMenuById);
routerMenu.put("/:id", [verifyToken, isAdmin], menuCtrl.updateItemIntoMenu);

routerMenu.post("/product", [verifyToken, isAdmin], menuCtrl.createItemOnMenu);
routerMenu.delete(
  "/product/:id",
  [verifyToken, isAdmin],
  menuCtrl.deleteItemMenu
);

export default routerMenu;
