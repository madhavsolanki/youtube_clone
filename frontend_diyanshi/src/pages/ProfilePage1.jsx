import React from "react";
import { CiEdit } from "react-icons/ci";
import photo from "../pages/girl.webp";
// import page from "../pages/ProfilePage.css";
import Customize from "../pages/CustomizeChannelPage";
import { Link } from "react-router-dom";

const ProfilePage1 = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Banner Photo */}
      <div className="relative w-full h-60 bg-gray-300 rounded-xl overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/gradient-gaming-youtube-channel-art_23-2148878727.jpg?ga=GA1.1.1048484898.1742357768&semt=ais_hybrid&w=740"
          alt="Banner"
          className="object-cover w-full h-full"
        />

        {/* Profile Photo */}
        <div className="absolute py-5 -bottom-0 left-6 flex items-center">
          <div className="relative mt-5">
            <img
              src={photo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              // width="100px"
              classname="desine"
            />
            {/* Edit Button */}
            <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              {/* <Pencil className="w-4 h-4 text-gray-600" /> */}
              <Link to={"/customize"}><CiEdit /></Link>
            
            </button>
          </div>
        </div>
      </div>

      {/* User Info and Buttons */}
      <div className="mt-16 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Username</h2>
          <p className="text-gray-600">1.2M subscribers • 240 videos</p>
        </div>

        <div className="flex gap-2">
          {/* <button className="bg-red-600 text-white hover:bg-red-700">Subscribe</button>
          <button className="bg-gray-200 text-black hover:bg-gray-300">Join</button> */}
          <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Suscribe</button>
          <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Join</button>
          

        </div>
      </div>
    </div>
  );
};

export default ProfilePage1;
