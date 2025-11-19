import React, { useState } from "react";

export default function CreateChamaForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [members, setMembers] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !goal || !members) {
      setError("Please fill in all required fields.");
      return;
    }
    // Simulate backend call
    try {
      // Replace with actual backend POST request
      await new Promise(res => setTimeout(res, 1000));
      setSuccess("Chama created successfully!");
      if (onCreate) onCreate({ name, description, goal, members });
      setName(""); setDescription(""); setGoal(""); setMembers("");
    } catch (err) {
      setError("Failed to create chama. Try again.");
    }
  };

  return (
    <form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-pink-700">Create a New Chama</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Chama Name *</label>
        <input type="text" className="w-full border rounded-lg px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea className="w-full border rounded-lg px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Goal Amount (KES) *</label>
        <input type="number" className="w-full border rounded-lg px-3 py-2" value={goal} onChange={e => setGoal(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Number of Members *</label>
        <input type="number" className="w-full border rounded-lg px-3 py-2" value={members} onChange={e => setMembers(e.target.value)} required />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700">Create Chama</button>
    </form>
  );
}
