import React, { useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    privacy: "public",
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 mt-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={profile.location} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-gray-700">Privacy Settings</label>
          <select name="privacy" value={profile.privacy} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="verified" checked={profile.verified} onChange={handleChange} />
          <label className="text-gray-700">Verified</label>
        </div>
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;
