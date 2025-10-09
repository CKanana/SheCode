import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SheFundHome from "./components/homepage";
import HomeDashboard from "./components/homedash";
import FinancialLiteracy from "./components/financial_lit";
import Budgeting from "./components/budget";
import Mainuser from "./components/mainuserhome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SheFundHome />} />
        <Route path="/dashboard" element={<HomeDashboard />} />
         <Route path="/financial-literacy" element={<FinancialLiteracy />} />
         <Route path="/budget" element={<Budgeting />}  />
                  <Route path="/main" element={<Mainuser />}  />

      </Routes>
    </Router>
  );
}

export default App;
