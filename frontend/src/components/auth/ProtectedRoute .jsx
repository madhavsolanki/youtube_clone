/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in
  return user ? children : <Navigate to="/register" />;
};

export default ProtectedRoute;

