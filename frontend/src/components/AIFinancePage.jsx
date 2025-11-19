import React, { useState } from "react";
import { Bot, TrendingUp, BarChart2 } from "lucide-react";

const AIFinancePage = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  // Simulate AI response
  const handleSend = () => {
    if (!input.trim()) return;
    setChat([...chat, { user: true, text: input }]);
    // Simple mock responses
    let response = "I'm your AI Financial Coach!";
    if (input.toLowerCase().includes("goal")) response = "Let's set a savings goal together.";
    else if (input.toLowerCase().includes("recommend")) response = "I recommend tracking your expenses weekly.";
    else if (input.toLowerCase().includes("credit")) response = "Your alternative credit score is 720. Improve it by paying bills on time.";
    else if (input.toLowerCase().includes("predict")) response = "Based on your history, you may save KES 2,000 next month.";
    setChat([...chat, { user: true, text: input }, { user: false, text: response }]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 flex items-center gap-2">
        <Bot className="inline-block" /> AI Financial Coach
      </h2>
      {/* Chatbot UI */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="h-64 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
          {chat.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.user ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.user ? 'bg-purple-100 text-purple-700' : 'bg-pink-100 text-pink-700'}`}>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your financial coach..."
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" onClick={handleSend}>Send</button>
        </div>
      </div>

      {/* Credit Scoring Dashboard */}
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="inline-block" /> Credit Scoring Dashboard
        </h3>
        <div className="mb-2 text-2xl font-bold text-pink-600">720</div>
        <div className="mb-2 text-gray-600">Score Components: Payment History, Savings, Chama Participation</div>
        <div className="mb-2 text-purple-500">Improvement Tips: Pay bills on time, increase savings, join more chamas</div>
        <div className="mb-2 text-green-600">Lending Opportunities: Microloans, Peer Lending</div>
      </section>

      {/* Predictive Analytics */}
      <section className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <BarChart2 className="inline-block" /> Predictive Analytics
        </h3>
        <div className="mb-2 text-gray-600">Spending Predictions: You may spend KES 3,500 next month.</div>
        <div className="mb-2 text-gray-600">Savings Goals: On track to reach KES 10,000 by December.</div>
        <div className="mb-2 text-gray-600">Risk Assessment: Low risk, stable income and savings pattern.</div>
      </section>
    </div>
  );
};

export default AIFinancePage;
