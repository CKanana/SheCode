import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Smile, Globe, TrendingUp, Users } from "lucide-react";

export default function SheFundHome() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex flex-col items-center text-gray-800 font-inter">
      
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6 px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-pink-600">SheFund</h1>
        </div>
        <div className="flex gap-6 text-gray-600 font-medium ">
          <a href="#home" className="hover:text-pink-600 transition">Home</a>
          <a href="#programs" className="hover:text-pink-600 transition">Programs</a>
          <a href="#resources" className="hover:text-pink-600 transition">Resources</a>
          <a href="#contact" className="hover:text-pink-600 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 mt-10">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6">
        
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Financial Freedom {"    "}
            <span className="text-pink-500"> At Your Fingertips</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-poppins">
            SheFund helps women achieve financial independence through expert mentorship,
            savings programs, and business support. Take your path to a brighter financial future.
          </p>

          <button      onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-lg px-10 py-3 rounded-full shadow-md transition">
            Get Started
          </button>
        </div>

        {/* Right Image Card */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex flex-col items-center relative">
         <div className="relative">
  <div className="absolute inset-0  blur-3xl bg-pink-100 opacity-10"></div>
  <img src="/background.png" alt="SheFund Woman" className="hero-image" />
</div>
          <div className="flex gap-4 mt-6 z-10">
            <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl">
              <Heart className="text-pink-500" size={18} />
              <span className="font-semibold text-sm">100+ Women Empowered</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl">
              <Smile className="text-yellow-500" size={18} />
              <span className="font-semibold text-sm">90% Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section id="programs" className="max-w-6xl w-full mt-24 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Focus Areas
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <TrendingUp className="text-pink-500" size={40} />,
              title: "Financial Literacy",
              text: "Learn how to budget, save, and invest wisely with our expert financial sessions."
            },
            {
              icon: <Globe className="text-pink-500" size={40} />,
              title: "Entrepreneurship",
              text: "Access mentorship and micro-grants to grow your business sustainably."
            },
            {
              icon: <Users className="text-pink-500" size={40} />,
              title: "Community Support",
              text: "Join a supportive network of women sharing success stories and financial tips."
            }
          ].map((card, i) => (
            <div
              key={i}
              className="shadow-lg border border-pink-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all rounded-3xl p-8 flex flex-col items-center text-center space-y-4"
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-10 bg-gradient-to-r from-pink-600 to-pink-500 text-white w-full text-center rounded-t-3xl shadow-inner">
        <p className="text-sm">
          © 2025 SheFund — Empowering Women One Goal at a Time 
        </p>
      </footer>
    </div>
  );
}
