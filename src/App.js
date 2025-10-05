import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SheFundHome from "./components/homepage";
import HomeDashboard from "./components/homedash";
import FinancialLiteracy from "./components/financial_lit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SheFundHome />} />
        <Route path="/dashboard" element={<HomeDashboard />} />
         <Route path="/financial-literacy" element={<FinancialLiteracy />} />
      </Routes>
    </Router>
  );
}

export default App;
