import React, { useState } from "react";

const ProfileSettings = () => {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle uploading the photo and saving profile info
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 flex items-center justify-center backdrop-blur-lg">
      <form className="bg-white/70 rounded-xl shadow-pink-300/60 p-8 w-full max-w-md backdrop-blur-md border border-pink-100" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Edit Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-2 overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-pink-400 text-4xl font-bold">{name[0]}</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
