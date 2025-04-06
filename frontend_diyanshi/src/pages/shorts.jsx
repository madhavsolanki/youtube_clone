import React from 'react';

const shortsData = [
  {
    id: 1,
    title: "Cool Trick Shot",
    description: "Watch this insane basketball trick shot!",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    channel: {
      name: "TrickShotPro",
      profileImg: "https://i.pravatar.cc/40?img=1"
    }
  },
  {
    id: 2,
    title: "Funny Cat Moment",
    description: "This cat will make your day! 😹",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    channel: {
      name: "CatLoverz",
      profileImg: "https://i.pravatar.cc/40?img=2"
    }
  },
  // Add more short videos as needed
];

const ShortsPage = () => {
  return (
    <div className="min-h-screen bg-sky-700 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">YouTube Shorts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {shortsData.map((short) => (
          <div key={short.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <video
              src={short.videoUrl}
              controls
              className="w-full h-80 object-cover bg-sky-700"
            ></video>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={short.channel.profileImg}
                  alt={short.channel.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{short.channel.name}</span>
              </div>
              <h2 className="text-lg font-semibold mb-1">{short.title}</h2>
              <p className="text-sm text-gray-300">{short.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsPage;
