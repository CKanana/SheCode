import Profile from "./components/Profile.jsx";
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
      </Routes>
    </Router>
  );
}

export default App;
