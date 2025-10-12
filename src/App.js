import Profile from "./components/Profile.jsx";
import PersonalFinance from "./components/PersonalFinance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SheFundHome from "./components/homepage";
import HomeDashboard from "./components/homedash";
import FinancialLiteracy from "./components/financial_lit";
import Budgeting from "./components/budget";
import Mainuser from "./components/mainuserhome";
import ChamaMain from "./components/ChamaMain";
import MyChamas from "./components/MyChamas";
import CreateChama from "./CreateChama.jsx";
import ChamaDiscovery from "./ChamaDiscovery.jsx";
import WalletPage from "./components/WalletPage";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ChatAiPage from "./components/ChatAiPage.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SheFundHome />} />
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/budget" element={<Budgeting />} />
          <Route path="/main" element={<Mainuser />} />
          <Route path="/chama" element={<ChamaMain />} />
          <Route path="/my-chamas" element={<MyChamas />} />
          <Route path="/learn" element={<FinancialLiteracy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/finance" element={<PersonalFinance />} />
          <Route path="/create-chama" element={<CreateChama />} />
          <Route path="/chama-discovery" element={<ChamaDiscovery />} />
          <Route path="/wallet" element={<WalletPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/ai-chat" element={<ChatAiPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
