import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Feed from "./components/Feed";
import Video from "./pages/video/Video";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path='/video/:categoryId/:videoId'element={<Video/>}/>
      </Routes>
    </div>
  );
};

export default App;
