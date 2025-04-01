import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/send-password-reset-otp", { email });
      toast.success(data.message);
      setStep(2); // Move to OTP input step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  // Function to verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/reset-password", { email, otp, newPassword });
      toast.success(data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">Enter your Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">Enter OTP</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
