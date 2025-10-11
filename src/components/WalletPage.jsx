import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Send, Download, FileText, PlusCircle } from 'lucide-react';

const mockTransactions = [
  { id: 1, type: 'outgoing', description: 'Chama Contribution - Nairobi Queens', amount: 5000, date: '2024-10-28' },
  { id: 2, type: 'incoming', description: 'Payment from Faith O.', amount: 1500, date: '2024-10-27' },
  { id: 3, type: 'outgoing', description: 'KPLC Bill Payment', amount: 1200, date: '2024-10-25' },
  { id: 4, type: 'incoming', description: 'Merry-Go-Round Payout', amount: 20000, date: '2024-10-20' },
  { id: 5, type: 'outgoing', description: 'Groceries', amount: 2500, date: '2024-10-19' },
];

const TransactionItem = ({ transaction }) => {
  const isIncoming = transaction.type === 'incoming';
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncoming ? 'bg-green-100' : 'bg-red-100'}`}>
          {isIncoming ? <ArrowDownLeft size={20} className="text-green-600" /> : <ArrowUpRight size={20} className="text-red-600" />}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <p className={`font-semibold ${isIncoming ? 'text-green-600' : 'text-gray-800'}`}>
        {isIncoming ? '+' : '-'} KES {transaction.amount.toLocaleString()}
      </p>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-2 text-gray-700 hover:text-pink-600 cursor-pointer transition-colors">
        <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-sm font-medium">{label}</p>
    </div>
);

const WalletPage = () => {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 font-sans">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/main')} className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">My Wallet</h1>
        </div>

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
            <ActionButton icon={<PlusCircle size={24} className="text-pink-600" />} label="Top Up" />
            <ActionButton icon={<Send size={24} className="text-pink-600" />} label="Send" />
            <ActionButton icon={<Download size={24} className="text-pink-600" />} label="Request" />
            <ActionButton icon={<FileText size={24} className="text-pink-600" />} label="Pay Bill" />
        </div>

        {/* Recent Transactions */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
                <button className="text-sm font-semibold text-pink-600 hover:underline">View All</button>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
                {mockTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;

```

### 2. Add the Route in `App.js`

Next, let's add a route for the new wallet page in your main router file, `App.js`.

```diff
--- a/c/Users/kanan/OneDrive/Desktop/SheCode/src/App.js
+++ b/c/Users/kanan/OneDrive/Desktop/SheCode/src/App.js
@@ -7,6 +7,7 @@
 import Mainuser from "./components/mainuserhome";
 import ChamaMain from "./components/ChamaMain";
 import MyChamas from "./components/MyChamas";
+import WalletPage from "./components/WalletPage";
 function App() {
   return (
     <Router>
@@ -17,6 +18,7 @@
   <Route path="/my-chamas" element={<MyChamas />} />
   <Route path="/learn" element={<FinancialLiteracy />} />
   <Route path="/profile" element={<Profile />} />
+  <Route path="/wallet" element={<WalletPage />} />
       </Routes>
     </Router>
   );