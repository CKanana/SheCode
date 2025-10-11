import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  BookOpen,
  Users,
  Settings,
  Bell,
  MessageSquare,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Award,
  Zap,
  Lightbulb,
  ArrowRight,
  LogOut
} from 'lucide-react';
  Bot,
  Send,
  LogOut,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow-lg shadow-pink-300/60 flex flex-col justify-between border border-pink-100">
    <div className="flex items-center justify-between">
      <div className="text-gray-500">{title}</div>
      {icon}
    </div>
    <div className="mt-2">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {change && <div className="text-sm text-green-500">{change}</div>}
    </div>
  </div>
);

const GoalProgress = ({ title, current, goal, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <span className="text-sm font-medium text-gray-500">KES {current.toLocaleString()} / {goal.toLocaleString()}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: `${(current / goal) * 100}%` }}></div>
    </div>
  </div>
);

const ChamaStatusCard = ({ name, role, contribution }) => (
  <div className="bg-pink-50/80 backdrop-blur-lg p-4 rounded-lg flex justify-between items-center border border-pink-200 shadow-md shadow-pink-300/60">
        <div>
            <p className="font-bold text-indigo-700">{name}</p>
            <p className="text-sm text-gray-600">{role}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-600">Next Due</p>
            <p className="font-semibold text-gray-800">KES {contribution.toLocaleString()}</p>
        </div>
    </div>
);

const AchievementBadge = ({ icon, title, color }) => (
    <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <p className="text-xs mt-2 font-medium text-gray-600">{title}</p>
    </div>
);

const ActionItem = ({ icon, title, description, path, navigate }) => (
    <div onClick={() => navigate(path)} className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
        <div className="mr-4 text-indigo-600">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ArrowRight size={20} className="ml-auto text-gray-400" />
    </div>
);


const MainDashboard = () => {
  const navigate = useNavigate();
  const [isChamaMenuOpen, setIsChamaMenuOpen] = useState(false);

  const chamaActions = [
    { icon: <Search size={20} />, label: 'Discover', path: '/chama-discovery' },
    { icon: <Plus size={20} />, label: 'Create', path: '/create-chama' },
    { icon: <Users size={20} />, label: 'My Chamas', path: '/my-chamas' },
  ];

  return (
  <div className="flex min-h-screen font-sans bg-gradient-to-br from-pink-100 via-[#FFF8DC] to-pink-200">
      {/* Left Sidebar */}
  <nav className="w-20 bg-white/70 backdrop-blur-lg shadow-lg flex flex-col items-center py-6 border-r border-pink-200">
        <div className="text-indigo-600 font-bold text-2xl mb-10">S</div>
        <ul className="flex flex-col items-center space-y-6">
          <li><a href="/main" className="p-3 bg-pink-100 text-pink-600 rounded-lg" title="Dashboard"><LayoutDashboard /></a></li>
          <li><a href="/wallet" className="p-3 text-gray-500 hover:text-pink-600" title="Wallet"><Wallet /></a></li>
          <li><a href="/learn" className="p-3 text-gray-500 hover:text-indigo-600" title="Learning Hub"><BookOpen /></a></li>
          <li><a href="/chama" className="p-3 text-gray-500 hover:text-pink-600" title="Chama Management"><Users /></a></li>
          <li><a href="/profile" className="p-3 text-gray-500 hover:text-indigo-600" title="Profile"><Settings /></a></li>
        </ul>
        <div className="mt-auto flex flex-col items-center space-y-6">
          <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold" title="Profile & Settings">
            J
          </button>
          <button onClick={() => navigate('/')} className="p-3 text-gray-500 hover:text-red-500" title="Logout">
            <LogOut />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Jane!</h1>
            <p className="text-gray-500">Here's your financial snapshot for today.</p>
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 font-poppins">
      {/* Navbar */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              SheFund
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                <Home className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/dependents" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                <Users className="w-4 h-4" /> Dependents
              </Link>
              <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                <BookOpen className="w-4 h-4" /> Learn
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full shadow-sm"><Bell size={20} className="text-gray-600" /></button>
            <button className="p-2 bg-white rounded-full shadow-sm"><MessageSquare size={20} className="text-gray-600" /></button>
          </div>
        </header>
          <div className="flex items-center gap-4">
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Wallet size={24} className="text-indigo-500" />} title="Total Balance" value="KES 85,230" change="+5.2% this month" />
          <div onClick={() => navigate('/budget')} className="cursor-pointer">
            <StatCard icon={<BookOpen size={24} className="text-pink-500" />} title="Personal Budget" value="Manage" change={null} />
          </div>
          <StatCard icon={<Users size={24} className="text-blue-500" />} title="Active Chamas" value="2" />
          <StatCard icon={<Star size={24} className="text-yellow-500" />} title="Credit Score" value="680" change="+20 points" />
      {/* Welcome + AI Assistant */}
      <section className="text-center mt-10 px-4">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">
          Hello, {currentUser?.firstName || 'User'}!
        </h2>
        <p className="text-gray-600">Welcome back to SheFund!</p>

        <div className="max-w-xl mx-auto mt-6 bg-white shadow-md rounded-full flex items-center p-2 border border-pink-100">
          <Bot className="text-pink-500 mx-2" size={22} />
          <input
            type="text"
            placeholder="Ask me anything... (e.g. 'Show my goals')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 color-black  px-3 py-2 focus:outline-none rounded-full"
          />
          <button
            onClick={handleAsk}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-full p-2 mr-1"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Budget Card Click Handler */}
          <div className="hidden">
            {/* Placeholder for future logic if needed */}
          </div>
          {/* Left Column: Goals & Chamas */}
          <div className="lg:col-span-2 space-y-8">
            {/* Financial Goals */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h2>
              <div className="space-y-3">
                  <ActionItem icon={<Wallet size={24}/>} title="Pay Chama Contribution" description="Nairobi Business Queens: KES 5,000 due in 3 days" path="/my-chamas" navigate={navigate} />
                  <ActionItem icon={<BookOpen size={24}/>} title="Continue Your Learning" description="Start the 'Smart Spender' module" path="/learn" navigate={navigate} />
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Financial Goals</h2>
              <div className="space-y-4">
                <GoalProgress title="Buy a Sewing Machine" current={35000} goal={50000} color="bg-indigo-500" />
                <GoalProgress title="Children's Education Fund" current={120000} goal={250000} color="bg-green-500" />
                <GoalProgress title="Emergency Fund" current={45000} goal={75000} color="bg-yellow-500" />
              </div>
            </div>

            {/* Chama Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Chama Status</h2>
              <div className="space-y-3">
                <ChamaStatusCard name="Nairobi Business Queens" role="Member" contribution={5000} />
                <ChamaStatusCard name="Kilimani Young Mothers" role="Treasurer" contribution={2000} />
              </div>
            </div>
          </div>

          {/* Right Column: AI Tips & Achievements */}
          <div className="space-y-8">
            {/* Mama Pesa's AI Tips */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Lightbulb className="text-yellow-500 mr-2" />
                    Mama Pesa's AI Tip
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                    "You're KES 15,000 away from your sewing machine goal! Consider adding an extra KES 1,000 from your budget this week to reach it faster."
                </p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Zap className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h2>
              <div className="grid grid-cols-3 gap-4">
                <AchievementBadge icon={<Award size={32} className="text-yellow-800"/>} title="Saver Pro" color="bg-yellow-200" />
                <AchievementBadge icon={<Star size={32} className="text-blue-800"/>} title="Chama Star" color="bg-blue-200" />
                <AchievementBadge icon={<BookOpen size={32} className="text-green-800"/>} title="Budget Master" color="bg-green-200" />
              </div>
            </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div ref={(el) => (sectionRefs.current.quickActions = el)} className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Quick Actions</h3>
          <p className="text-sm text-gray-500 mb-4">Manage your finances easily</p>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50">
              <Plus className="w-4 h-4 text-pink-600" /> Add Transaction
            </button>
            <button className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50">
              <Target className="w-4 h-4 text-pink-600" /> Set New Goal
            </button>
            <button className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50">
              <TrendingUp className="w-4 h-4 text-pink-600" /> View Analytics
            </button>
            <button 
              onClick={() => navigate("/dependents")}
              className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50"
            >
              <Users className="w-4 h-4 text-pink-600" /> Manage Dependents
            </button>
            <button className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50">
              <BookOpen className="w-4 h-4 text-pink-600" /> Learning Resources
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Chamas */}
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          {isChamaMenuOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-2">
              {chamaActions.map((action, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="bg-white text-sm text-gray-700 px-3 py-1 rounded-md shadow-sm">
                    {action.label}
                  </span>
                  <button
                    onClick={() => navigate(action.path)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                  >
                    {action.icon}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;