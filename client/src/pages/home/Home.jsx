import React from "react";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";

const Home = ({ sidebar }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebar={sidebar} />

      {/* Main Content Area */}
      <div
        className={`bg-gray-100 p-5 transition-all w-full min-h-screen ${
          sidebar ? "ml-64" : "ml-16"
        }`}
      >
        <Feed />
      </div>
    </div>
  );
};

export default Home;
