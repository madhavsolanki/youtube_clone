// CustomizeChannelPage.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaPlusCircle, FaUserCircle, FaImage } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const CustomizeChannelPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white px-4">
      {/* Banner Placeholder */}
      <div className="w-full max-w-5xl rounded-2xl bg-gray-200 dark:bg-gray-800 h-52 md:h-64 flex items-center justify-center relative">
        <FaImage className="text-4xl text-gray-500 dark:text-gray-400" />
        <span className="absolute bottom-2 right-4 text-sm text-gray-500 dark:text-gray-400">Channel Banner</span>
      </div>

      {/* Profile + Message */}
      <div className="flex flex-col items-center mt-6 space-y-4">
        <FaUserCircle className="text-7xl text-gray-500 dark:text-gray-400" />
        <h2 className="text-2xl font-semibold">No Channel Found</h2>
        <p className="text-center max-w-md text-sm text-gray-600 dark:text-gray-400">
          You don’t have a channel yet. A channel helps you share videos, engage with your audience, and build your brand.
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow"
        >
          <FaPlusCircle />
          Create Channel
        </button>
      </div>

      {/* Dialog for Channel Creation */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 shadow-xl relative">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500"
            >
              <MdClose />
            </button>
            <Dialog.Title className="text-2xl font-bold mb-4">Create Your Channel</Dialog.Title>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Channel Name</label>
                <input type="text" placeholder="Your Channel Name" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1">Creator Name</label>
                <input type="text" placeholder="Creator Name" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1">Channel Description</label>
                <textarea placeholder="Write a short description..." rows={3} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Profile Image</label>
                  <input type="file" className="w-full text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Banner Image</label>
                  <input type="file" className="w-full text-sm" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md w-full mt-4"
              >
                Create Channel
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomizeChannelPage;
