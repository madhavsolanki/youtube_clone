/* eslint-disable no-unused-vars */
// import React from "react";
import { FaVideo, FaYoutube, FaUpload, FaCog } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiSolidCustomize } from "react-icons/bi";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useState } from "react";

const Dashboard = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // 👈 Track dialog visibility
  const navigate = useNavigate();

  const [showUploadDialog, setShowUploadDialog] = useState(false); // for video upload dialog

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // 👈 Logout API call
      localStorage.removeItem("user"); // 👈 Clear user data
      toast.success("Logged out successfully");
      setShowLogoutDialog(false); // 👈 Close dialog
      navigate("/register"); // 👈 Navigate to register
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex bg-black text-white h-screen overflow-hidden">
      {/* Sidebar - Fixed */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-black p-4 border-r border-gray-700">
        <h1 className="text-xl mt-16 font-bold mb-6 m text-center">
          Bizivilty Studio
        </h1>
        <nav className="flex flex-col space-y-4">
          <Link to={"/edit-profile"}>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <AiOutlineEdit /> Edit Profile
            </a>
          </Link>
          <Link to={"/channel"}>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <BiSolidCustomize /> Customize Channel
            </a>
          </Link>
          <Link to={""}>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <FaVideo /> Videos
              {/* onClick={() => setIsOpen(true)} */}
            </a>
          </Link>
          <Link to={"/shorts"}>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <FaYoutube /> Shorts
            </a>
          </Link>
          <button
            onClick={() => setShowUploadDialog(true)}
            className="flex items-center gap-2 text-green-500 hover:text-green-400"
          >
            <FaUpload /> Upload
          </button>

          {/* 👇 Trigger Logout Dialog */}
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-500"
          >
            <BiLogOut /> Logout
          </button>

          <a
            href="#"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <FaCog /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <header className="sticky top-0 w-full bg-black p-4 shadow-md">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        </header>

        {/* Content Section */}
        <main className="flex-1 px-6 py-4 overflow-y-auto">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Videos</h3>
              <p className="text-2xl">10</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Shorts</h3>
              <p className="text-2xl">5</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Watch Time</h3>
              <p className="text-2xl">150 hrs</p>
            </div>
          </div>

          {/* Your Uploads */}
          <h3 className="text-xl font-semibold mb-4">Your Uploads</h3>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between bg-gray-900 p-4 rounded-lg items-center"
              >
                <span className="text-lg">Video {i + 1}</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                    <AiOutlineEdit />
                  </button>
                  <button className="p-2 bg-red-500 rounded-lg hover:bg-red-600">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 👇 Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Upload New Video</h3>

            <form className="space-y-4">
              <div>
                <label className="block mb-1">Video Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block mb-1">Video Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video description"
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Video Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div>
                <label className="block mb-1">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadDialog(false)}
                  className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
