import express from "express";
const router = express.Router();
import userRoute from '../routes/userRouter'
router.use("/auth", userRoute);

export default router;
