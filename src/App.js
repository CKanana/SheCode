import Profile from "./components/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SheFundHome from "./components/homepage";
import HomeDashboard from "./components/homedash";
import FinancialLiteracy from "./components/financial_lit";
import PersonalBudget from "./components/budget";
import MainDashboard from "./components/mainuserhome";
import ChamaMain from "./components/ChamaMain.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SheFundHome />} />
        <Route path="/learn" element={<FinancialLiteracy />} />
    <Route path="/main" element={<MainDashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/chama" element={<ChamaMain />} />
    <Route path="/budget" element={<PersonalBudget />} />
      </Routes>
    </Router>
  );
}

export default App;
