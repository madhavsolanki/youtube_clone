/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Profile Picture Uploading Handling
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Profile Texttal Editing
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/user/data");
        if (data?.success && data?.userData) {
          const user = data?.userData;
          setProfileImage(
            user?.profilePicture?.imageUrl ||
              "https://avatars.githubusercontent.com/u/117305306?v=4"
          );
          setFirstName(user?.firstName || "");
          setLastName(user?.lastName || "");
          setUsername(user?.username || "");
          setEmail(user?.email || "");
          setPhoneNumber(user?.phoneNumber || "");
        }
      } catch (error) {
        toast.error("Failed to fetch profile data.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const openEditDialog = () => {
    setUpdatedFirstName(firstName);
    setUpdatedLastName(lastName);
    setUpdatedUsername(username);
    setUpdatedEmail(email);
    setUpdatedPhoneNumber(phoneNumber);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      username: updatedUsername,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
    };
    try {
      const { data } = await axiosInstance.put("/user/update-profile", updatedData);
      toast.success("Profile updated successfully!");

      // Update state with new data
      setFirstName(updatedFirstName);
      setLastName(updatedLastName);
      setUsername(updatedUsername);
      setEmail(updatedEmail);
      setPhoneNumber(updatedPhoneNumber);

      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const { data } = await axiosInstance.put(
        "/user/upload-profile-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProfileImage(data.profilePicture.imageUrl);
      toast.success("Profile picture updated successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center relative">
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <button
            onClick={() => setIsDialogOpen(true)}
            className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-600 transition-all"
          >
            Edit
          </button>
        </div>
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-500">@{username}</p>
        <p className="text-gray-600 mt-2">{email}</p>
        <p className="text-gray-600">{phoneNumber}</p>
        <button
          onClick={openEditDialog}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <input
              type="text"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              placeholder="Username"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Email"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={updatedPhoneNumber}
              onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full mb-4 px-3 py-2 border rounded-md"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog for Profile Picture Update */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Update Profile Picture
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {selectedFile && (
              <p className="mt-2 text-gray-600 text-sm">{selectedFile.name}</p>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpload}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Update
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
