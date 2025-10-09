import React, { useState, useRef } from "react";
import {
  Wallet,
  TrendingUp,
  Target,
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Home,
  BookOpen,
  Settings,
  Bot,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const sectionRefs = useRef({});

  // Financial Cards
  const financialCards = [
    {
      title: "Total Balance",
      amount: "KES12,450.00",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Savings Goal",
      amount: "KES8,200.00",
      change: "of KES10,000",
      trend: "up",
      icon: PiggyBank,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Investments",
      amount: "KES5,750.00",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Monthly Expenses",
      amount: "KES2,340.00",
      change: "-5.1%",
      trend: "down",
      icon: CreditCard,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  // Goals
  const goals = [
    { name: "Emergency Fund", current: 8200, target: 10000 },
    { name: "Retirement Savings", current: 15000, target: 50000 },
    { name: "Investment Portfolio", current: 5750, target: 15000 },
  ];

  // Activity
  const recentActivity = [
    { type: "expense", category: "Groceries", amount: "KES127.50", date: "Today" },
    { type: "income", category: "Salary", amount: "KES4,200.00", date: "Yesterday" },
    { type: "expense", category: "Shopping", amount: "KES89.00", date: "2 days ago" },
    { type: "saving", category: "Emergency Fund", amount: "KES500.00", date: "3 days ago" },
  ];

  // --- AI Assistant ---
  const handleAsk = () => {
    const input = query.toLowerCase();
    let section = null;

    if (input.includes("goal")) section = "goals";
    else if (input.includes("activity") || input.includes("recent")) section = "activity";
    else if (input.includes("analytics") || input.includes("invest")) section = "analytics";
    else if (input.includes("add")) section = "quickActions";

    if (section && sectionRefs.current[section]) {
      sectionRefs.current[section].scrollIntoView({ behavior: "smooth" });
      setResponse(`Navigating to your ${section} section `);
    } else {
      setResponse("I’m not sure where that is. Try: 'Show my goals' or 'View analytics'.");
    }

    setQuery("");
  };

  return (
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
              <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                <BookOpen className="w-4 h-4" /> Learn
              </Link>
            </nav>
          </div>
          <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
        </div>
      </header>

      {/* Welcome + AI Assistant */}
      <section className="text-center mt-10 px-4">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">Hello, User </h2>
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
        {response && <p className="mt-2 text-sm text-gray-600 italic">{response}</p>}
      </section>

      {/* Analytics Cards */}
      <section
        ref={(el) => (sectionRefs.current.analytics = el)}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-10 px-6"
      >
        {financialCards.map((card, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-pink-100 transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-2xl`} />
            <div className="relative flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-600">{card.title}</h3>
              <card.icon className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold">{card.amount}</h2>
            <div className="flex items-center gap-1 text-sm mt-1">
              {card.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-gray-500">{card.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Goals + Actions + Activity */}
      <section className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10 px-6">
        {/* Goals */}
        <div ref={(el) => (sectionRefs.current.goals = el)} className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Financial Goals</h3>
              <p className="text-sm text-gray-500">Track your progress towards your goals</p>
            </div>
            <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-full">
              <Plus className="w-4 h-4" /> Add Goal
            </button>
          </div>
          {goals.map((goal, i) => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">
                    KES{goal.current.toLocaleString()} / KES{goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-pink-500 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% complete</p>
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
            <button className="flex items-center gap-3 border border-pink-200 rounded-lg px-4 py-2 hover:bg-pink-50">
              <BookOpen className="w-4 h-4 text-pink-600" /> Learning Resources
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          ref={(el) => (sectionRefs.current.activity = el)}
          className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-md mt-6"
        >
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Recent Activity</h3>
          <p className="text-sm text-gray-500 mb-4">Your latest transactions and updates</p>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "income"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "saving"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {activity.type === "income" ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : activity.type === "saving" ? (
                      <PiggyBank className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.category}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    activity.type === "income"
                      ? "text-green-600"
                      : activity.type === "saving"
                      ? "text-blue-600"
                      : "text-rose-600"
                  }`}
                >
                  {activity.type === "expense" ? "-" : "+"}
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
