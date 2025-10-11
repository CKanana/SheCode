import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SheFundHome from "./components/homepage";
import HomeDashboard from "./components/homedash";
import FinancialLiteracy from "./components/financial_lit";
import Budgeting from "./components/budget";
import Mainuser from "./components/mainuserhome";
import Dependents from "./components/Dependents";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SheFundHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/main" element={
            <ProtectedRoute>
              <Mainuser />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <HomeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/financial-literacy" element={
            <ProtectedRoute>
              <FinancialLiteracy />
            </ProtectedRoute>
          } />
          <Route path="/budget" element={
            <ProtectedRoute>
              <Budgeting />
            </ProtectedRoute>
          } />
          <Route path="/dependents" element={
            <ProtectedRoute>
              <Dependents />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
