import React from 'react';
import { Link } from 'react-router-dom';
import menu_icon from '../assets/menu.png';
import logo from '../assets/logo.png';
import search_icon from '../assets/search.png';
import upload_icon from '../assets/upload.png';
import more_icon from '../assets/more.png';
import notification_icon from '../assets/notification.png';
import profile_icon from '../assets/jack.png';

const Navbar = ({ setsidebar }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-white shadow-md fixed top-0 w-full z-10">
      {/* Left Section */}
      <div className="flex items-center">
        <img
          className="w-5 mr-6 cursor-pointer"
          onClick={() => setsidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        <Link to={'/'}>
        <img className="w-32" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Middle Section */}
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mr-4">
          <input
            type="text"
            placeholder="Search"
            className="w-96 bg-transparent outline-none"
          />
          <img className="w-4 ml-2" src={search_icon} alt="Search" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <img className="w-6 mr-6 cursor-pointer" src={upload_icon} alt="Upload" />
        <img className="w-6 mr-6 cursor-pointer" src={more_icon} alt="More" />
        <img className="w-6 mr-6 cursor-pointer" src={notification_icon} alt="Notifications" />
        <Link to={'/profile'}>
          <img className="w-11 h-8 rounded-full cursor-pointer" src={profile_icon} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
