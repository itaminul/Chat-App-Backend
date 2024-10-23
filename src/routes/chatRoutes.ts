import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import { authMiddleware } from "../middleware/authMiddleware";
const chateController = new ChatController();
const router = Router();
router.post("/groups", authMiddleware, chateController.createGroup);
export default router;
