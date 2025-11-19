import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Send, Download, FileText, PlusCircle } from 'lucide-react';
import SidebarNav from "./SidebarNav";
import { BarChart2, X, Lightbulb } from "lucide-react";
import { Calculator } from "lucide-react";
// PersonalFinance form component (inline)
const PersonalFinanceForm = ({ onClose }) => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "Rent/Housing", amount: "" },
    { name: "Groceries", amount: "" },
    { name: "Utilities", amount: "" },
    { name: "Transport", amount: "" },
    { name: "Other", amount: "" },
  ]);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExpenseChange = (index, value) => {
    const updated = [...expenses];
    updated[index].amount = value;
    setExpenses(updated);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis("");

    // Construct a detailed prompt for the AI
    const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const prompt = `
      As a friendly financial coach for a woman in Kenya, analyze the following financial data and provide 3 short, actionable suggestions.
      One suggestion must be about how a Chama (savings group) could help her.
      Keep the tone encouraging and simple.

      Data:
      - Monthly Income: KES ${salary}
      - Expenses: ${expenses.map(e => `${e.name}: KES ${e.amount}`).join(', ')}
      - Total Expenses: KES ${totalExpenses}
      - Stated Financial Goals: "Buy a Sewing Machine", "Build an Emergency Fund"

      Provide the response as a simple, unformatted text string with each suggestion on a new line, starting with a dash.
    `;

    try {
      // This is where you would call your actual AI backend
      // For now, we'll simulate the call and response.
      console.log("Sending prompt to AI:", prompt);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulated AI Response
      const simulatedResponse = `- Your transport costs are a bit high. Could you try using public transport one extra day a week to save towards your sewing machine?\n- You have a good surplus after expenses! A Chama would be a great way to commit some of that money to your emergency fund consistently.\n- You are doing great! Try to set aside KES 500 this week into a separate savings pot. Every little bit helps!`;
      setAnalysis(simulatedResponse);

    } catch (error) {
      setAnalysis("Sorry, I couldn't generate suggestions right now. Please try again.");
      console.error("AI analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    let csv = "Personal Finance Analysis\n";
    csv += `Monthly Salary (KES),${salary}\n`;
    csv += "Expenses\n";
    csv += "Category,Amount (KES)\n";
    expenses.forEach(exp => {
      csv += `${exp.name},${exp.amount}\n`;
    });
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    csv += `Total Expenses,${totalExpenses}\n`;
    csv += "\nAI Analysis\n";
    csv += analysis.split('\n').map(line => `"${line}"`).join("\n");
    csv += "\n";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal_finance_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
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
            <div key={exp.name + idx} className="flex items-center gap-2 mb-2">
              <input
                type="text" 
                className="flex-1 p-2 border border-gray-200 rounded-lg"
                value={exp.name}
                readOnly={idx < 4} // Make the original ones read-only
                onChange={e => {
                  if (idx >= 5) {
                    const updated = [...expenses];
                    updated[idx].name = e.target.value;
                    setExpenses(updated);
                  }
                }}
              />
              <input
                type="number"
                className="w-32 p-2 border border-pink-200 rounded-lg"
                placeholder="KES"
                value={exp.amount}
                onChange={e => handleExpenseChange(idx, e.target.value)}
              />
              {idx >= 5 && (
                <button type="button" className="p-2 text-red-500 hover:text-red-700" onClick={() => setExpenses(expenses.filter((_, i) => i !== idx))}><X size={18} /></button>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-200 rounded-lg"
              placeholder="Other expense name"
              value={newExpenseName}
              onChange={e => setNewExpenseName(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700"
              onClick={() => {
                if (newExpenseName.trim()) {
                  setExpenses([...expenses, { name: newExpenseName, amount: "" }]);
                  setNewExpenseName("");
                }
              }}
            >Add</button>
          </div>
        </div>
        <button
          className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition disabled:opacity-50"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : <><BarChart2 /> Get AI Suggestions</>}
        </button>
        {analysis && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-800 flex items-center gap-2 mb-2"><Lightbulb size={18}/> Your AI-Powered Suggestions:</h3>
            <div className="text-indigo-700 text-sm space-y-2 whitespace-pre-line">
              {analysis}
            </div>
            <button className="mt-4 text-xs font-semibold text-pink-600 hover:underline" onClick={handleDownloadCSV}>Export as Excel (CSV)</button>
          </div>
        )}
        <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold mt-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const categories = ["Food", "Transport", "School Fees", "Groceries", "Utilities", "Rent", "Other"];
const mockTransactions = [
  { id: 1, type: 'outgoing', description: 'Chama Contribution - Nairobi Queens', amount: 5000, date: '2024-10-28', category: "Other" },
  { id: 2, type: 'incoming', description: 'Payment from Faith O.', amount: 1500, date: '2024-10-27', category: "Other" },
  { id: 3, type: 'outgoing', description: 'KPLC Bill Payment', amount: 1200, date: '2024-10-25', category: "Utilities" },
  { id: 4, type: 'incoming', description: 'Merry-Go-Round Payout', amount: 20000, date: '2024-10-20', category: "Other" },
  { id: 5, type: 'outgoing', description: 'Groceries', amount: 2500, date: '2024-10-19', category: "Groceries" },
];

const TransactionItem = ({ transaction, onCategorize }) => {
  const isIncoming = transaction.type === 'incoming';
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer" onClick={() => onCategorize(transaction)}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncoming ? 'bg-green-100' : 'bg-red-100'}`}>
          {isIncoming ? <ArrowDownLeft size={20} className="text-green-600" /> : <ArrowUpRight size={20} className="text-red-600" />}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
          <span className="text-xs text-pink-600">{transaction.category}</span>
        </div>
      </div>
      <p className={`font-semibold ${isIncoming ? 'text-green-600' : 'text-gray-800'}`}>
        {isIncoming ? '+' : '-'} KES {transaction.amount.toLocaleString()}
      </p>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center gap-2 text-gray-700 hover:text-pink-600 cursor-pointer transition-colors" onClick={onClick}>
    <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const WalletPage = () => {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showCategorize, setShowCategorize] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');
  const [budgets, setBudgets] = useState({});
  const [showAIBudget, setShowAIBudget] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpData, setTopUpData] = useState({ phone: "", amount: "" });
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [sendData, setSendData] = useState({ search: "", user: null, amount: "" });
  const [sendSuccess, setSendSuccess] = useState(false);
  const [showPayBill, setShowPayBill] = useState(false);
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [payBillData, setPayBillData] = useState({ biller: "", account: "", amount: "" });
  const [payBillSuccess, setPayBillSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [detailsTx, setDetailsTx] = useState(null);

  // Categorize transaction
  const handleCategorize = (tx) => {
    setSelectedTx(tx);
    setShowCategorize(true);
  };
  const handleSetCategory = (cat) => {
    setTransactions(transactions.map(t => t.id === selectedTx.id ? { ...t, category: cat } : t));
    setShowCategorize(false);
    setSelectedTx(null);
  };

  // Budget logic
  const handleBudgetChange = (cat, value) => {
    setBudgets({ ...budgets, [cat]: Number(value) });
  };

  // AI Budget Suggestion (mock)
  const handleAIBudget = () => {
    // Simple mock: average of past spending per category
    const aiBudgets = {};
    categories.forEach(cat => {
      const total = transactions.filter(t => t.category === cat && t.type === 'outgoing').reduce((sum, t) => sum + t.amount, 0);
      aiBudgets[cat] = total ? Math.round(total * 1.1) : 5000;
    });
    setBudgets(aiBudgets);
    setShowAIBudget(false);
  };

  // Spending per category
  const spending = categories.reduce((acc, cat) => {
    acc[cat] = transactions.filter(t => t.category === cat && t.type === 'outgoing').reduce((sum, t) => sum + t.amount, 0);
    return acc;
  }, {});

  // Search & Filter
  const filteredTx = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? tx.type === filterType : true;
    const matchesDate = (!dateRange.from || new Date(tx.date) >= new Date(dateRange.from)) && (!dateRange.to || new Date(tx.date) <= new Date(dateRange.to));
    return matchesSearch && matchesType && matchesDate;
  });

  // Transaction Details
  const handleDetails = (tx) => {
    setDetailsTx(tx);
    setShowDetails(true);
  };
  const handleDetailsChange = (field, value) => {
    setDetailsTx({ ...detailsTx, [field]: value });
  };
  const handleDetailsSave = () => {
    setTransactions(transactions.map(t => t.id === detailsTx.id ? detailsTx : t));
    setShowDetails(false);
    setDetailsTx(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 font-sans flex">
      <SidebarNav />
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/main')} className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">My Wallet</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('transactions')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'transactions' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`}>Transactions</button>
          <button onClick={() => setActiveTab('budgets')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'budgets' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`}>Budgets</button>
          <button onClick={() => setShowFinanceForm(true)} className="px-4 py-2 rounded-lg font-semibold bg-indigo-100 text-indigo-700 ml-auto">Upload Finances</button>
        </div>
  {/* Personal Finance Form Modal */}
  {showFinanceForm && <PersonalFinanceForm onClose={() => setShowFinanceForm(false)} />}

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-2xl shadow-2xl shadow-purple-200 mb-8">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium opacity-80">Total Balance</p>
                <button onClick={() => setBalanceVisible(!balanceVisible)} className="opacity-80 hover:opacity-100">
                    {balanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <p className="text-4xl font-bold tracking-tight">
                {balanceVisible ? "KES 85,230.50" : "••••••••••"}
            </p>
        </div>

        {/* Quick Actions */}
    <div className="grid grid-cols-4 gap-4 mb-10">
      <ActionButton icon={<PlusCircle size={24} className="text-pink-600" />} label="Top Up" onClick={() => setShowTopUp(true)} />
      <ActionButton icon={<Send size={24} className="text-pink-600" />} label="Send" onClick={() => setShowSend(true)} />
      <ActionButton icon={<Download size={24} className="text-pink-600" />} label="Request" />
      <ActionButton icon={<FileText size={24} className="text-pink-600" />} label="Pay Bill" onClick={() => setShowPayBill(true)} />
    </div>
        {/* Top Up Modal */}
        {showTopUp && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-80">
              <h3 className="text-lg font-bold mb-4">Top Up with Mobile Money</h3>
              {topUpSuccess ? (
                <div className="text-green-600 font-semibold mb-4">Check your phone to enter your PIN!</div>
              ) : (
                <>
                  <input type="text" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Phone Number" value={topUpData.phone} onChange={e => setTopUpData({ ...topUpData, phone: e.target.value })} />
                  <input type="number" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Amount (KES)" value={topUpData.amount} onChange={e => setTopUpData({ ...topUpData, amount: e.target.value })} />
                  <button className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 mb-2" onClick={() => setTopUpSuccess(true)}>Simulate STK Push</button>
                </>
              )}
              <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={() => { setShowTopUp(false); setTopUpSuccess(false); setTopUpData({ phone: "", amount: "" }); }}>Close</button>
            </div>
          </div>
        )}

        {/* Send Money Modal */}
        {showSend && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Send Money</h3>
              {sendSuccess ? (
                <div className="text-green-600 font-semibold mb-4">Money sent successfully!</div>
              ) : (
                <>
                  <input type="text" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Search user by name or phone" value={sendData.search} onChange={e => setSendData({ ...sendData, search: e.target.value })} />
                  {/* Mock user search results */}
                  {sendData.search && (
                    <div className="mb-2">
                      <button className="w-full py-2 rounded-lg bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200" onClick={() => setSendData({ ...sendData, user: { name: sendData.search, phone: sendData.search } })}>Send to {sendData.search}</button>
                    </div>
                  )}
                  {sendData.user && (
                    <>
                      <div className="mb-2 text-sm text-gray-700">To: {sendData.user.name} ({sendData.user.phone})</div>
                      <input type="number" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Amount (KES)" value={sendData.amount} onChange={e => setSendData({ ...sendData, amount: e.target.value })} />
                      <button className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 mb-2" onClick={() => setSendSuccess(true)}>Send Money</button>
                    </>
                  )}
                </>
              )}
              <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={() => { setShowSend(false); setSendSuccess(false); setSendData({ search: "", user: null, amount: "" }); }}>Close</button>
            </div>
          </div>
        )}

        {/* Pay Bill Modal */}
        {showPayBill && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Pay Bill</h3>
              {payBillSuccess ? (
                <div className="text-green-600 font-semibold mb-4">Bill paid successfully!</div>
              ) : (
                <>
                  <select className="w-full p-2 border border-pink-200 rounded-lg mb-2" value={payBillData.biller} onChange={e => setPayBillData({ ...payBillData, biller: e.target.value })}>
                    <option value="">Select Biller</option>
                    <option value="KPLC">KPLC</option>
                    <option value="Nairobi Water">Nairobi Water</option>
                    <option value="Safaricom">Safaricom</option>
                    <option value="Zuku">Zuku</option>
                    <option value="Other">Other</option>
                  </select>
                  <input type="text" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Account Number" value={payBillData.account} onChange={e => setPayBillData({ ...payBillData, account: e.target.value })} />
                  <input type="number" className="w-full p-2 border border-pink-200 rounded-lg mb-2" placeholder="Amount (KES)" value={payBillData.amount} onChange={e => setPayBillData({ ...payBillData, amount: e.target.value })} />
                  <button className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 mb-2" onClick={() => setPayBillSuccess(true)}>Pay Bill</button>
                </>
              )}
              <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={() => { setShowPayBill(false); setPayBillSuccess(false); setPayBillData({ biller: "", account: "", amount: "" }); }}>Close</button>
            </div>
          </div>
        )}

        {/* Tabs Content */}
        {activeTab === 'transactions' && (
          <div>
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Search transactions..."
                className="p-2 border border-pink-200 rounded-lg flex-1"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <button className={`px-3 py-1 rounded-lg ${filterType === '' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`} onClick={() => setFilterType('')}>All</button>
                <button className={`px-3 py-1 rounded-lg ${filterType === 'incoming' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`} onClick={() => setFilterType('incoming')}>Incoming</button>
                <button className={`px-3 py-1 rounded-lg ${filterType === 'outgoing' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`} onClick={() => setFilterType('outgoing')}>Outgoing</button>
              </div>
              <div className="flex gap-2">
                <input type="date" className="p-2 border border-pink-200 rounded-lg" value={dateRange.from} onChange={e => setDateRange({ ...dateRange, from: e.target.value })} />
                <span className="text-gray-500">to</span>
                <input type="date" className="p-2 border border-pink-200 rounded-lg" value={dateRange.to} onChange={e => setDateRange({ ...dateRange, to: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
                <button className="text-sm font-semibold text-pink-600 hover:underline">View All</button>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
                {filteredTx.map(tx => <TransactionItem key={tx.id} transaction={tx} onCategorize={handleCategorize} onClick={() => handleDetails(tx)} />)}
            </div>
          </div>
        )}

        {activeTab === 'budgets' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Budgets</h2>
              <button className="text-sm font-semibold text-pink-600 hover:underline" onClick={() => setShowAIBudget(true)}>Create a Budget with AI</button>
            </div>
            <div className="space-y-6">
              {categories.map(cat => (
                <div key={cat} className="bg-white/80 p-4 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">{cat}</span>
                    <input
                      type="number"
                      className="w-24 p-2 border border-pink-200 rounded-lg"
                      placeholder="Budget (KES)"
                      value={budgets[cat] || ""}
                      onChange={e => handleBudgetChange(cat, e.target.value)}
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${budgets[cat] ? Math.min(100, (spending[cat] / budgets[cat]) * 100) : 0}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Spent: KES {spending[cat].toLocaleString()}</span>
                    <span>Budget: KES {budgets[cat] ? budgets[cat].toLocaleString() : "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categorize Modal */}
        {showCategorize && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-80">
              <h3 className="text-lg font-bold mb-4">Categorize Transaction</h3>
              <div className="space-y-2 mb-4">
                {categories.map(cat => (
                  <button key={cat} className="w-full py-2 rounded-lg bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200" onClick={() => handleSetCategory(cat)}>{cat}</button>
                ))}
              </div>
              <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={() => setShowCategorize(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Transaction Details Modal */}
        {showDetails && detailsTx && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
              <div className="mb-2 text-sm text-gray-700">{detailsTx.description}</div>
              <div className="mb-2 text-xs text-gray-500">{detailsTx.date} {detailsTx.time || ""}</div>
              <div className="mb-2">
                <span className="font-semibold">Category:</span> {detailsTx.category}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Amount:</span> KES {detailsTx.amount.toLocaleString()}
              </div>
              {/* Map placeholder for merchant location */}
              <div className="mb-2">
                <span className="font-semibold">Merchant Location:</span>
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Map Placeholder</div>
              </div>
              <div className="mb-2">
                <label className="font-semibold">Personal Notes:</label>
                <textarea className="w-full p-2 border border-pink-200 rounded-lg" value={detailsTx.notes || ""} onChange={e => handleDetailsChange('notes', e.target.value)} placeholder="Add notes..." />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Attach Receipt:</label>
                <input type="file" accept="image/*" onChange={e => handleDetailsChange('receipt', e.target.files[0])} />
                {detailsTx.receipt && <span className="block text-xs text-green-600 mt-1">Receipt attached</span>}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700" onClick={handleDetailsSave}>Save</button>
                <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={() => setShowDetails(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* AI Budget Modal */}
        {showAIBudget && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-80">
              <h3 className="text-lg font-bold mb-4">AI Budget Suggestion</h3>
              <p className="mb-4 text-sm text-gray-700">Let AI analyze your past spending and suggest a budget for each category.</p>
              <button className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700" onClick={handleAIBudget}>Generate Budget</button>
              <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold mt-2" onClick={() => setShowAIBudget(false)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WalletPage;


// ...existing code...