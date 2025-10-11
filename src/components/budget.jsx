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
        <div className="mt-6 bg-pink-50 rounded-lg p-4 text-pink-700 shadow-inner">
          <p>
            <strong>Tip:</strong> Track your spending, set savings goals, and adjust your budget to reach your financial dreams!
          </p>
        </div>
      </div>
    </div>
  );
}
