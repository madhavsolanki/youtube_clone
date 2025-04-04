import React from 'react'
import home from '../assets/home.png';
import game_icon from '../assets/game_icon.png';
import automobiles from '../assets/automobiles.png';
import sports from '../assets/sports.png';
import entertainment from '../assets/entertainment.png';
import tech from '../assets/tech.png';
import music from '../assets/music.png';
import blogs from '../assets/blogs.png';
import news from '../assets/news.png';
import jack from '../assets/jack.png';
import simon from '../assets/simon.png';
import tom from '../assets/tom.png';
import megan from '../assets/megan.png';
import cameron from '../assets/cameron.png';

const Sidebar = ({ sidebar }) => {
  const menuItems = [
    { icon: home, label: 'Home' },
    { icon: game_icon, label: 'Gaming' },
    { icon: automobiles, label: 'Automobiles' },
    { icon: sports, label: 'Sports' },
    { icon: entertainment, label: 'Entertainment' },
    { icon: tech, label: 'Tech' },
    { icon: music, label: 'Music' },
    { icon: blogs, label: 'Blogs' },
    { icon: news, label: 'News' },
  ];

  const subscribedChannels = [
    { icon: jack, label: 'PewDiePie' },
    { icon: simon, label: 'MrBeast' },
    { icon: tom, label: 'Justin Bieber' },
    { icon: megan, label: '5-Minute Crafts' },
    { icon: cameron, label: 'Nas Daily' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen overflow-y-auto bg-gray-100 p-5 transition-all ${
        sidebar ? "w-64" : "w-16"
      }`}
    >
      {/* Main menu */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            {sidebar && <p className="ml-4 text-sm font-medium">{item.label}</p>}
          </div>
        ))}
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Subscribed channels */}
      <h3 className={`text-gray-600 text-sm mb-2 ${!sidebar && "hidden"}`}>Subscribed</h3>
      <div className="space-y-3">
        {subscribedChannels.map((channel, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
          >
            <img src={channel.icon} alt={channel.label} className="w-8 h-8 rounded-full" />
            {sidebar && <p className="ml-4 text-sm font-medium">{channel.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
