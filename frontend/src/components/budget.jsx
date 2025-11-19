import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialBudget = [
  { id: 1, category: 'Food', amount: 6000 },
  { id: 2, category: 'Transport', amount: 3000 },
  { id: 3, category: 'Rent', amount: 12000 },
  { id: 4, category: 'Savings', amount: 4000 },
];

export default function PersonalBudget() {
  const [budget, setBudget] = useState(initialBudget);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [salary, setSalary] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!category || !amount) return;
    setBudget([...budget, { id: Date.now(), category, amount: Number(amount) }]);
    setCategory('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setBudget(budget.filter(item => item.id !== id));
  };

  const total = budget.reduce((sum, item) => sum + item.amount, 0);

  const handleAnalyze = async () => {
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    try {
      const expenses = {};
      budget.forEach(item => { expenses[item.category] = item.amount; });
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/ai/finance-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary: Number(salary), expenses })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAiResult(data);
    } catch (err) {
      setAiError(err.message || 'Failed to analyze budget.');
    }
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cornsilk to-pink-200 p-8">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-pink-600 hover:underline">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>
        <div className="flex items-center mb-6">
          <BookOpen size={32} className="text-pink-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Personal Budget</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Monthly Salary / Income</label>
          <input
            type="number"
            placeholder="Enter your salary (KES)"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-pink-400 mb-2"
          />
        </div>
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 w-1/2 focus:outline-pink-400"
            />
            <input
              type="number"
              placeholder="Amount (KES)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="border rounded-lg px-3 py-2 w-1/2 focus:outline-pink-400"
            />
            <button
              onClick={handleAdd}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 flex items-center"
            >
              <Plus size={18} className="mr-1" /> Add
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Budget Breakdown</h2>
          <ul className="divide-y divide-pink-100">
            {budget.map(item => (
              <li key={item.id} className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">{item.category}</span>
                <span className="text-gray-600">KES {item.amount.toLocaleString()}</span>
                <button onClick={() => handleDelete(item.id)} className="ml-2 text-pink-400 hover:text-pink-600">
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right text-xl font-bold text-pink-700">
          Total: KES {total.toLocaleString()}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleAnalyze}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-600 font-semibold"
            disabled={aiLoading || !salary || budget.length === 0}
          >
            {aiLoading ? 'Analyzing...' : 'Analyze'}
          </button>
          {aiError && <div className="text-red-500">{aiError}</div>}
          {aiResult && (
            <div className="bg-pink-50 rounded-lg p-4 text-pink-700 shadow-inner mt-2">
              <div className="mb-2"><strong>AI Analysis:</strong></div>
              <div className="mb-2">{aiResult.aiResponse}</div>
              <div><strong>Total Expenses:</strong> KES {aiResult.totalExpenses.toLocaleString()}</div>
              <div><strong>Savings Potential:</strong> KES {aiResult.savingsPotential.toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
