import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaHome, FaPiggyBank, FaGraduationCap } from "react-icons/fa";
import { LogOut, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function HomeDashboard() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    const text = query.toLowerCase();

    if (text.includes("move")) navigate("/moving-out");
    else if (text.includes("car")) navigate("/buy-car");
    else if (text.includes("budget") || text.includes("save")) navigate("/budget");
    else if (text.includes("invest")) navigate("/investing");
    else alert("I’m not sure how to help with that yet!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 flex flex-col items-center p-6">
      {/* Header with Logout */}
      <div className="w-full max-w-5xl flex justify-end mb-4">
        <div className="flex items-center gap-4">
          <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <header className="text-center mt-6">
        <h1 className="text-4xl font-bold text-pink-600 drop-shadow-sm font-poppins">
          Hello, {currentUser?.firstName || 'User'}! Welcome Back 
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          What can I help you with today?
        </p>
      </header>

      {/* AI Assistant Input */}
      <div className="flex mt-6 mb-10 gap-3">
        <input
          type="text"
          placeholder="Type your request..."
          className="px-4 py-2 rounded-lg border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition"
        >
          Ask
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Card 1 */}
        <div
          onClick={() => navigate("/moving-out")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 hover:shadow-pink-300 transition transform hover:-translate-y-1"
        >
          <FaHome className="text-pink-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Moving Out</h2>
          <p className="text-gray-600">
            Learn how to plan, budget, and manage your move with confidence.
          </p>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => navigate("/buy-car")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 hover:shadow-pink-300 transition transform hover:-translate-y-1"
        >
          <FaCar className="text-pink-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Buying Your First Car
          </h2>
          <p className="text-gray-600">
            Understand financing, insurance, and ownership costs before buying.
          </p>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => navigate("/budget")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 hover:shadow-pink-300 transition transform hover:-translate-y-1"
        >
          <FaPiggyBank className="text-pink-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Budgeting 101</h2>
          <p className="text-gray-600">
            Track your income, expenses, and savings goals with smart tools.
          </p>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => navigate("/investing")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 hover:shadow-pink-300 transition transform hover:-translate-y-1"
        >
          <FaGraduationCap className="text-pink-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Investing Basics</h2>
          <p className="text-gray-600">
            Learn how to grow your money safely through smart investments.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm">
        © 2025 FinGuide — Empowering Financial Confidence
      </footer>
    </div>
  );
}
