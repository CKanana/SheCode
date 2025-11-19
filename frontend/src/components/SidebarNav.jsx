import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react";

const SidebarNav = ({ showLogout = true }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-20 bg-white/70 backdrop-blur-lg shadow-lg flex flex-col items-center py-6 border-r border-pink-200 fixed top-0 left-0 h-screen z-50">
      <div className="text-indigo-600 font-bold text-2xl mb-10">S</div>
      <ul className="flex flex-col items-center space-y-6">
        <li><button onClick={() => navigate('/main')} className="p-3 bg-pink-100 text-pink-600 rounded-lg" title="Dashboard"><LayoutDashboard /></button></li>
        <li><button onClick={() => navigate('/wallet')} className="p-3 text-gray-500 hover:text-pink-600" title="Wallet"><Wallet /></button></li>
        <li><button onClick={() => navigate('/learn')} className="p-3 text-gray-500 hover:text-indigo-600" title="Learning Hub"><BookOpen /></button></li>
        <li><button onClick={() => navigate('/chama')} className="p-3 text-gray-500 hover:text-pink-600" title="Chama Management"><Users /></button></li>
        <li><button onClick={() => navigate('/profile')} className="p-3 text-gray-500 hover:text-indigo-600" title="Profile"><Settings /></button></li>
      </ul>
      {showLogout && (
        <div className="mt-auto flex flex-col items-center space-y-6">
          <button onClick={() => navigate("/login")} className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold" title="Login/Logout">J</button>
          <button onClick={() => navigate("/")} className="p-3 text-gray-500 hover:text-red-500" title="Logout"><LogOut /></button>
        </div>
      )}
    </nav>
  );
};

export default SidebarNav;
