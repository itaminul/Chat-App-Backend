import { Router } from "express";
import { UserController } from "../controllers/userController";

const userController = new UserController();
const route = Router();

route.post("/register", userController.create);

export default route;
