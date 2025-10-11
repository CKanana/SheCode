import React, { useState } from "react";
import SidebarNav from "./SidebarNav";

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  privacy: {
    name: "chama-only", // options: public, private, chama-only
    location: "matches-only", // options: public, private, matches-only
  },
  verified: false,
  profilePic: "",
  preview: "",
  financialGoals: "",
  interests: [],
};

const interestOptions = [
  "Farming",
  "Tailoring",
  "Digital Marketing",
  "Business",
  "Cooking",
  "Crafts",
  "Education",
  "Other",
];

const financialGoalOptions = [
  "Start a Business",
  "Buy Land",
  "Pay School Fees",
  "Save for Emergency",
  "Other",
];

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('privacy.')) {
      const key = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [key]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profilePic: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleInterestsChange = (interest) => {
    setProfile((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    alert("Profile updated!");
  };

  // Simulated biometric enable
  const handleEnableBiometric = () => {
    alert("Biometric authentication enabled! (Simulated)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 flex items-center justify-center backdrop-blur-lg">
      <SidebarNav />
      <form className="bg-white/70 rounded-xl shadow-pink-300/60 p-8 w-full max-w-lg backdrop-blur-md border border-pink-100" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Edit Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-2 overflow-hidden">
            {profile.preview ? (
              <img src={profile.preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-pink-400 text-4xl font-bold">{profile.name[0] || "U"}</span>
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
            name="name"
            className="border rounded px-3 py-2 w-full"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="border rounded px-3 py-2 w-full"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            className="border rounded px-3 py-2 w-full"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="border rounded px-3 py-2 w-full"
            value={profile.location}
            onChange={handleChange}
            placeholder="e.g. Nairobi, Kenya"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Financial Goals</label>
          <select
            name="financialGoals"
            className="border rounded px-3 py-2 w-full mb-2"
            value={profile.financialGoals}
            onChange={handleChange}
          >
            <option value="">Select a goal...</option>
            {financialGoalOptions.map((goal) => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
          <input
            type="text"
            name="financialGoals"
            className="border rounded px-3 py-2 w-full"
            value={profile.financialGoals}
            onChange={handleChange}
            placeholder="Or write your own goal..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests/Skills</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <button
                type="button"
                key={interest}
                className={`px-3 py-1 rounded-full border ${profile.interests.includes(interest) ? 'bg-pink-200 border-pink-400 text-pink-700' : 'bg-white border-gray-300 text-gray-600'}`}
                onClick={() => handleInterestsChange(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Name:</span>
              <select name="privacy.name" value={profile.privacy.name} onChange={handleChange} className="ml-2 border rounded px-2 py-1">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="chama-only">Chama Members Only</option>
              </select>
            </div>
            <div>
              <span className="font-medium">Location:</span>
              <select name="privacy.location" value={profile.privacy.location} onChange={handleChange} className="ml-2 border rounded px-2 py-1">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="matches-only">Potential Chama Matches Only</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Secret Savings (Fog-of-War Mode)</label>
          <input type="checkbox" name="secretSavings" checked={profile.secretSavings || false} onChange={handleChange} />
          <span className="text-xs text-gray-500">Hide balances or require PIN for sensitive data</span>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <span className="block text-sm font-medium text-gray-700">Biometric Authentication</span>
          <button type="button" onClick={handleEnableBiometric} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 font-semibold">Enable Fingerprint/Face ID</button>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" name="verified" checked={profile.verified} onChange={handleChange} />
          <label className="text-gray-700">Verified</label>
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

export default Profile;
