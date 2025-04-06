import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytlogo from "/logo.png";
import logo from "/youtube.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/ContextApi";
import Loader from "../shared/loader";
import axiosInstance from "../config/axiosConfig";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false); // <- New State
  const [profileImage, setProfileImage] = useState(""); // <- New state for profile image
  const navigate = useNavigate();
 


  const { loading, mobileMenu, setMobileMenu } = useContext(Context);



  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];


   // Fetch profile image on mount
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/user/data");
        const imageUrl = res?.data?.userData?.profilePicture?.imageUrl;
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
      <div className="sticky top-0 z-20 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
        {loading && <Loader />}

        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className="flex md:hidden md:mr-6 mr-4 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#8888]/[0.6]"
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="dark:text-white text-black text-xl" />
              ) : (
                <SlMenu className="dark:text-white text-black text-xl" />
              )}
            </div>
          )}
          <Link to="/" className="flex h-5 items-center mt-4">
            <img
              className="hidden dark:hidden md:block h-8"
              src={ytlogo}
              alt="Youtube"
            />
            <img className="h-full md:hidden mr-6" src={logo} alt="Youtube" />
          </Link>
        </div>

        {/* Search Box */}
        <div className="group flex items-center my-1 mr-7">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#888888] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-black dark:text-white text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-black dark:text-white pr-5 pl-5  md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search"
              value={searchQuery}
            />
          </div>
          <button
            className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#888888] rounded-r-3xl bg-white/[0.1] dark:bg-black/[0.1]"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <IoIosSearch className="text-black dark:text-white text-xl" />
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center">
          <div className="hidden md:flex">
            {/* Upload Icon */}
            <div
              onClick={() => setShowUploadDialog(true)}
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] cursor-pointer"
            >
              <RiVideoAddLine className="text-black dark:text-white text-xl" />
            </div>

            <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <FiBell className="text-black dark:text-white text-xl cursor-pointer" />
            </div>
          </div>

          <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4 mx-1">
            <Link to={"/dashboard"}>
              <img
                src={
                  profileImage ||
                  "https://xsgames.co/randomusers/assets/avatars/male/67.jpg"
                }
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Upload Video Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Upload New Video</h3>

            <form className="space-y-4">
              <div>
                <label className="block mb-1">Video Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block mb-1">Video Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video description"
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Video Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div>
                <label className="block mb-1">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadDialog(false)}
                  className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

