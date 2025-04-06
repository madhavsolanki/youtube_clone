import  { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaImage, FaUserCircle, FaVideo, FaTimes } from "react-icons/fa";

const ChannelOverview = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const channel = {
    channelName: "Code with Madhav",
    creatorName: "Madhav Solanki",
    description:
      "Welcome to my channel! I share React, Android, and full-stack tutorials, tips, and project walkthroughs.",
    bannerImageUrl: "",
    profileImageUrl: "",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Banner */}
      <div className="w-full h-60 md:h-72 relative bg-gray-200 dark:bg-gray-800">
        {channel.bannerImageUrl ? (
          <img
            src={channel.bannerImageUrl}
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaImage className="text-4xl text-gray-500" />
          </div>
        )}
        <div className="absolute left-6 bottom-[-40px]">
          {channel.profileImageUrl ? (
            <img
              src={channel.profileImageUrl}
              alt="Channel Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-black"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400 bg-white dark:bg-black rounded-full border-4 border-white dark:border-black" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-20 px-6 md:px-10">
        <h1 className="text-3xl font-bold">{channel.channelName}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Created by <span className="font-medium">{channel.creatorName}</span>
        </p>
        {channel.description && (
          <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300 text-base">
            {channel.description}
          </p>
        )}
      </div>

      {/* Action */}
      <div className="mt-6 px-6 md:px-10">
        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
        >
          <FaVideo />
          Upload Video
        </button>
      </div>

      {/* Upload Video Dialog */}
      <Transition appear show={isUploadOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsUploadOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                      Upload Video
                    </Dialog.Title>
                    <button onClick={() => setIsUploadOpen(false)}>
                      <FaTimes className="text-gray-500 hover:text-red-500 text-xl" />
                    </button>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter video title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your video"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Upload Video File
                      </label>
                      <input type="file" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Thumbnail Image
                      </label>
                      <input type="file" className="w-full" />
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsUploadOpen(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ChannelOverview;
