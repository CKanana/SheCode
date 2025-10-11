import Profile from "./components/Profile.jsx";
import PersonalFinance from "./components/PersonalFinance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
function App() {
  return (
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
    </Routes>
    </Router>
  );
}

export default App;
