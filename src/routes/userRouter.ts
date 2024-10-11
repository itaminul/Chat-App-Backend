import { Router } from "express";
import { UserController } from "../controllers/userController";

const userController = new UserController();
const route = Router();

route.post("/", userController.create.bind);

export default route;
