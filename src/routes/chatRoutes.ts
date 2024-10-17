import { Router } from "express";
import { ChatController } from "../controllers/chatController";
const chateController = new ChatController();
const router = Router();
router.post("/groups", chateController.createGroup);
export default router;
