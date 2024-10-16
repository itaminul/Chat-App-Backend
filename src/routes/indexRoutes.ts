import express from "express";
const router = express.Router();
import userRoute from "../routes/userRouter";
import authRoute from "../routes/authRoutes";
router.use("/user", userRoute);
router.use("/auth", authRoute);
export default router;
