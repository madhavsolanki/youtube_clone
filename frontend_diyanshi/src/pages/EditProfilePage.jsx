/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FaCamera, FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosConfig.js'; // adjust path as needed

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
  });

  const [profileImage, setProfileImage] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...formData });

  const [isEditable, setIsEditable] = useState(false); // ✅ New state to control editability

  // Fetch User Profile Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get('/user/data');
        if (res.data.success) {
          const user = res.data.userData;
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
          });
          setProfileImage(user.profilePicture?.imageUrl);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    if (!isEditable) return; // ✅ Prevent changes unless editable
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Update Profile Image
  const handleImageUpload = async () => {
    if (!selectedImage) return toast.error('Please select an image.');

    const formData = new FormData();
    formData.append('profilePicture', selectedImage);

    try {
      const res = await axiosInstance.put('/user/upload-profile-picture', formData);
      setProfileImage(res.data.profilePicture.imageUrl);
      toast.success('Profile picture updated successfully');
      setShowImageDialog(false);
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload profile picture');
    }
  };

  // --------------------- User Text Data Update Handling --------------------------
  const openEditDialog = () => {
    setEditFormData(formData); // Pre-fill fields
    setShowEditDialog(true);
    setIsEditable(true); // ✅ Enable input editing when edit profile is clicked
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axiosInstance.put('/user/update-profile', editFormData);
      if (res.data.success) {
        setFormData({ ...formData, ...editFormData });
        toast.success(res.data.message);
        setShowEditDialog(false);
        setIsEditable(false); // ✅ Disable editing after update
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Profile</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-36 h-36">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md"
            />
            <button
              onClick={() => setShowImageDialog(true)}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-xl transition-transform hover:scale-110"
            >
              <FaCamera size={18} />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {['firstName', 'lastName', 'username', 'email', 'phoneNumber'].map((field) => (
              <div key={field} className={field === 'phoneNumber' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium mb-2">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!isEditable} // ✅ Makes input read-only unless editing
                  type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={openEditDialog}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-lg rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <FaUserEdit size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Picture Upload Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">Update Profile Picture</h3>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="block w-full text-sm mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowImageDialog(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Textual Profile Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Profile</h3>

            {['firstName', 'lastName', 'username', 'phoneNumber', 'password'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  name={field}
                  type={field === 'password' ? 'password' : 'text'}
                  value={editFormData[field] || ''}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setIsEditable(false); // ✅ Cancel editing
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
