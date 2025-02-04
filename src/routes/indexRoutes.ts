import express from "express";
const router = express.Router();
import userRoute from "../routes/userRouter";
import authRoute from "../routes/authRoutes";
import chatRoute from "../routes/chatRoutes";
router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/chat", chatRoute);

export default router;
