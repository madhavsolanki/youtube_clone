import React from "react";
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";
import thumbnail4 from "../assets/thumbnail4.png";
import thumbnail5 from "../assets/thumbnail5.png";
import thumbnail6 from "../assets/thumbnail6.png";
import thumbnail7 from "../assets/thumbnail7.png";
import thumbnail8 from "../assets/thumbnail8.png";

const Recommended = () => {
  const videos = [
    {
      thumbnail: thumbnail1,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail2,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail3,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail4,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail5,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail6,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail7,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
    {
      thumbnail: thumbnail8,
      title: "Best channel that helps you become a web developer",
      author: "GreatStack",
      views: "199k Views",
    },
  ];
  return (
    <div className="pt-10">
      {videos.map((video, index) => (
        <div key={index} className="flex items-start space-x-3 mb-3">
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="w-1/2 rounded-md"
          />
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{video.title}</h4>
            <p className="text-xs text-gray-600">{video.author}</p>
            <p className="text-xs text-gray-600">{video.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
