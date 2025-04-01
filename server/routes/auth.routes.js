import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  sendPasswordResetOtp,
  verifyOtpAndResetPassword,
} from "../controllers/auth.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", isUserAuthenticated, logoutUser);

router.post("/send-password-reset-otp", sendPasswordResetOtp);

router.post('/reset-password', verifyOtpAndResetPassword);

export default router;
