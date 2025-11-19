import React, { useState } from "react";

import { useEffect } from "react";

const MyChamas = () => {
  // const navigate = useNavigate(); // Unused
  const [chamas, setChamas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChamas = async () => {
      setLoading(true);
      setError("");
      try {
        // TODO: Add auth token if needed
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/chama/all`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch chamas");
        setChamas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchChamas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white/70 rounded-xl shadow-pink-300/60 p-8 w-full max-w-2xl backdrop-blur-md border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Chamas</h2>
        {loading && <div className="text-gray-500">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="space-y-4">
          {chamas.map(chama => (
            <div key={chama._id} className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-bold text-pink-700">{chama.name}</h2>
              <p className="text-gray-700 mb-2">{chama.description}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>Goal: KES {chama.goal.toLocaleString()}</span>
                <span>Members: {chama.members}</span>
                <span>Created: {new Date(chama.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChamas;
