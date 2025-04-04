/* eslint-disable no-unused-vars */
// import React from "react";
import { FaVideo, FaYoutube, FaUpload, FaChartBar, FaCog } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex bg-black text-white h-screen overflow-hidden">
      {/* Sidebar - Fixed */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-black p-4 border-r border-gray-700">
        <h1 className="text-xl mt-16 font-bold mb-6 m text-center">Bizivilty Studio</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <AiOutlineEdit /> Edit Profile
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FaVideo /> Videos
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FaYoutube /> Shorts
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FaUpload /> Upload
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
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
              <div key={i} className="flex justify-between bg-gray-900 p-4 rounded-lg items-center">
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
    </div>
  );
};

export default Dashboard;
