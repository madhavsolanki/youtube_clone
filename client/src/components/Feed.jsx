import React from 'react'
import { Link } from 'react-router-dom'
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";
import thumbnail4 from "../assets/thumbnail4.png";
import thumbnail5 from "../assets/thumbnail5.png";
import thumbnail6 from "../assets/thumbnail6.png";
import thumbnail7 from "../assets/thumbnail7.png";
import thumbnail8 from "../assets/thumbnail8.png";


const videos = [
  { id: 1, thumbnail: thumbnail1 },
  { id: 2, thumbnail: thumbnail2 },
  { id: 3, thumbnail: thumbnail3 },
  { id: 4, thumbnail: thumbnail4 },
  { id: 5, thumbnail: thumbnail5 },
  { id: 6, thumbnail: thumbnail6 },
  { id: 7, thumbnail: thumbnail7 },
  { id: 8, thumbnail: thumbnail8 },
];

const Feed = () => {
  return (
    <>
      {/* Top Categories Section */}
      <div className="w-full h-24 overflow-x-auto whitespace-nowrap bg-white flex gap-3 px-4 py-2 mt-8">
        {[
          "All",
          "Shorts",
          "Live",
          "Music",
          "Game",
          "Blog",
          "Technology",
          "Science",
          "News",
        ].map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-4">
        {videos.map((video) => (
          <Link to={`/video/${video.id}`} key={video.id} className="block">
            <div className="bg-white shadow-md p-2 rounded-lg">
              <img src={video.thumbnail} alt="Thumbnail" className="w-full rounded-lg" />
              <h2 className="text-lg font-semibold mt-2 text-gray-800">
                Best channel to learn coding that helps you to be a web developer
              </h2>
              <h3 className="text-gray-600">Greatstack</h3>
              <p className="text-gray-500 text-sm">15k views • 2 days ago</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Feed