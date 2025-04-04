import React from 'react'
import { CiEdit } from "react-icons/ci";
import profileimage from '../assets/profileimage.jpg';
import thumbnails from '../assets/thumbnail1.png'; // 


const UserProfile = () => {
  const user = {
    name: 'Hema Rajput',
    bio: 'Hi guys, I am a software engineer passionate about React and web development.',
    avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    email: 'Hema@example.com',
    location: 'San Francisco, CA',
    phoneNumber:"9520469987"
  };
  return (
    <>
    {/* Profile Header */}
    <div className="text-center p-6 bg-cover bg-center my-8"  style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/top-view-online-learning-remote-graduation-ceremony-commencement-design-concept-with-graduation-academic-cap-diploma-laptop-white-table-background_315337-7064.jpg?w=1380')" }}>
      <img className="w-36 mt-2 h-36 rounded-full mx-auto" src={profileimage} alt="Avatar" />
      <button className="absolute top-4 right-4 bg-gray-500 p-2 rounded-md text-white">
        <CiEdit size={20} />
      </button>
      <h3 className="text-lg font-semibold">@hemara</h3>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.phoneNumber}</p>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">2.01K subscribers • 21 Videos</p>
      <p className="text-gray-700">{user.bio}</p>
      <div className="mt-4 space-x-4">
        <button className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400">Subscribe</button>
        <button className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400">Join</button>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-center space-x-4 py-4 bg-gray-100">
      {["Home", "Videos", "Shorts", "Playlist", "Post"].map((tab, index) => (
        <button key={index} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          {tab}
        </button>
      ))}
    </div>

    {/* Video Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white shadow-lg p-4 rounded-lg">
          <img className="w-full rounded-md" src={thumbnails} alt="Thumbnail" />
          <h2 className="font-semibold mt-2">Best channel to learn coding</h2>
          <h3 className="text-gray-600">Greatstack</h3>
          <p className="text-gray-500">15K views • 2 days ago</p>
        </div>
      ))}
    </div>
  </>
  )
}

export default UserProfile