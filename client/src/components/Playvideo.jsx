import React from 'react';
import Video1 from '../assets/video.mp4';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import jack from '../assets/jack.png';
import user_profile from '../assets/user_profile.jpg';
import Recommended from './Recommended';


const Playvideo = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="w-full">
          <video src={Video1} className="w-full" controls></video>
        </div>
        <Recommended />
        <div className="flex flex-col md:flex-row justify-between w-full px-5 mt-4">
          <div className="md:w-3/5 p-4">
            <h3 className="text-lg font-semibold">Best Youtube Channel To Learn Web Development</h3>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
              <p>1525 views &bull; 2 days ago</p>
              <div className="flex gap-4">
                <span className="flex items-center"><img src={like} alt="Like" className="w-5" /></span>
                <span className="flex items-center"><img src={dislike} alt="Dislike" className="w-5" /></span>
                <span className="flex items-center"><img src={share} alt="Share" className="w-5" /></span>
                <span className="flex items-center"><img src={save} alt="Save" className="w-5" /></span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img src={jack} alt="Publisher" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-bold">GreatStack</p>
                <span className="text-gray-500 text-sm">1M Subscribers</span>
              </div>
              <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded">Subscribe</button>
            </div>
            <div className="mt-4 text-gray-700">
              <p>Channel that makes learning Easy</p>
              <p>Subscribe GreatStack to Watch More Tutorials on web development</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="px-5">
        <h4 className="text-lg text-gray-700">130 Comments</h4>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-start mt-4">
            <img src={user_profile} alt="User" className="w-9 h-9 rounded-full mr-3" />
            <div>
              <h3 className="text-sm font-semibold">Jack Nicholson <span className="text-gray-500 text-xs">1 day ago</span></h3>
              <p className="text-sm text-gray-600 mt-1">A global computer network providing a variety of information and interconnected networks using standardized communication protocols.</p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <img src={like} alt="Like" className="w-4 mr-1" /> <span>244</span>
                <img src={dislike} alt="Dislike" className="w-4 ml-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playvideo;
