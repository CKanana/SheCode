import React, { useState } from "react";
import SidebarNav from "./SidebarNav";
import { Calculator, BarChart2, CheckCircle } from "lucide-react";

const PersonalFinance = () => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "Rent", amount: "" },
    { name: "Groceries", amount: "" },
    { name: "Utilities", amount: "" },
    { name: "Transport", amount: "" },
    { name: "Other", amount: "" },
  ]);
  const [analysis, setAnalysis] = useState("");

  const handleExpenseChange = (index, value) => {
    const updated = [...expenses];
    updated[index].amount = value;
    setExpenses(updated);
  };

  const handleAnalyze = () => {
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const remaining = Number(salary || 0) - totalExpenses;
    let advice = "";
    if (remaining > 0) {
      advice = `Great! You have KES ${remaining.toLocaleString()} left after expenses. Consider saving or investing.`;
    } else if (remaining === 0) {
      advice = "You are breaking even. Try to reduce some expenses to save.";
    } else {
      advice = `Warning: You are overspending by KES ${Math.abs(remaining).toLocaleString()}. Review your expenses!`;
    }
    setAnalysis(advice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center font-sans">
      <SidebarNav />
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <Calculator className="text-pink-500" /> Personal Finance
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Salary / Income</label>
          <input
            type="number"
            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your salary (KES)"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses</label>
          {expenses.map((exp, idx) => (
            <div key={exp.name} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-200 rounded-lg"
                value={exp.name}
                readOnly
              />
              <input
                type="number"
                className="w-32 p-2 border border-pink-200 rounded-lg"
                placeholder="KES"
                value={exp.amount}
                onChange={e => handleExpenseChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition"
          onClick={handleAnalyze}
        >
          <BarChart2 /> Analyze
        </button>
        {analysis && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-indigo-700 flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <span>{analysis}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalFinance;
