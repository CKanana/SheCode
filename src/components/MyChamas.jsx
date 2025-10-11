import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const mockChamas = [
  {
    id: 1,
    name: "Nairobi Business Queens",
    role: "Treasurer",
    members: [
      { name: "Jane Mwangi", role: "Chairperson" },
      { name: "Amina Yusuf", role: "Member" },
      { name: "Faith Otieno", role: "Member" },
    ],
  },
  {
    id: 2,
    name: "Kilimani Young Mothers",
    role: "Member",
    members: [
      { name: "Mary Wanjiru", role: "Chairperson" },
      { name: "You", role: "Member" },
      { name: "Grace Njeri", role: "Treasurer" },
    ],
  },
];

const MyChamas = () => {
  const navigate = useNavigate();
  const [selectedChama, setSelectedChama] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Assume user is treasurer for demo

  const handleSelectChama = (chama) => {
    setSelectedChama(chama);
    setIsAdmin(chama.role === "Treasurer");
  };

  const handleAppointTreasurer = (memberName) => {
    alert(`${memberName} is now the Treasurer. You lose admin rights.`);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white/70 rounded-xl shadow-pink-300/60 p-8 w-full max-w-2xl backdrop-blur-md border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Chamas</h2>
        {!selectedChama ? (
          <ul className="space-y-4">
            {mockChamas.map((chama) => (
              <li key={chama.id} className="bg-pink-50 rounded-lg p-4 flex justify-between items-center">
                <span className="font-semibold text-pink-700">{chama.name}</span>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" onClick={() => handleSelectChama(chama)}>
                  View Members
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-pink-600 mb-4">{selectedChama.name}</h3>
            <ul className="space-y-2 mb-4">
              {selectedChama.members.map((member, idx) => (
                <li key={idx} className="flex justify-between items-center bg-pink-50 rounded px-3 py-2">
                  <span>{member.name}</span>
                  <span className="text-xs text-gray-600">{member.role}</span>
                  {isAdmin && member.role !== "Treasurer" && member.name !== "You" && (
                    <button className="bg-indigo-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => handleAppointTreasurer(member.name)}>
                      Appoint Treasurer
                    </button>
                  )}
                  {isAdmin && member.name !== "You" && (
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => alert(`Deleted ${member.name}`)}>
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAdmin && (
              <div className="mb-4">
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mr-2" onClick={() => alert('Send info to group')}>Send Info</button>
              </div>
            )}
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full font-semibold" onClick={() => setSelectedChama(null)}>
              Back to My Chamas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChamas;
