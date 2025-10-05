import React from "react";
import { Lightbulb, Home, Car, PiggyBank, TrendingUp } from "lucide-react";

export default function HomeDashboard() {
  const suggestions = [
    { icon: <Home className="text-pink-500" size={22} />, title: "Moving Out" },
    { icon: <Car className="text-pink-500" size={22} />, title: "Buying My First Car" },
    { icon: <PiggyBank className="text-pink-500" size={22} />, title: "Saving for a Goal" },
    { icon: <TrendingUp className="text-pink-500" size={22} />, title: "Starting a Business" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center text-gray-800 px-6 py-10">
      {/* Greeting Section */}
      <div className="max-w-3xl text-center space-y-4 mt-10">
        <h1 className="text-4xl font-bold text-pink-600">
          Hello, <span className="text-gray-800">Welcome Back!</span>
        </h1>
        <p className="text-lg text-gray-600">
          What can I help you with today?
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col items-center justify-center bg-white border border-pink-100 rounded-2xl shadow-[0_0_15px_rgba(255,20,147,0.2)] hover:shadow-[0_0_25px_rgba(255,20,147,0.4)] transition-all p-6 hover:scale-105"
          >
            <div className="bg-pink-50 p-4 rounded-full mb-3">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Suggestion Bar */}
      <div className="flex items-center gap-3 mt-16 text-pink-600 font-medium">
        <Lightbulb size={20} />
        <span>Tip: Explore one goal at a time — we’ll guide you step by step 💪</span>
      </div>
    </div>
  );
}
