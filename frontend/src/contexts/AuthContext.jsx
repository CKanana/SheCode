import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session on app load
  useEffect(() => {
    const checkAuthState = () => {
      const userData = localStorage.getItem('shefund_user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  // Register function
  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          financialData: {
            totalBalance: 0,
            savingsGoal: 10000,
            investments: 0,
            monthlyExpenses: 0,
            goals: [
              { name: "Emergency Fund", current: 0, target: 10000 },
              { name: "Retirement Savings", current: 0, target: 50000 },
              { name: "Investment Portfolio", current: 0, target: 15000 },
            ],
            recentActivity: []
          },
          dependents: []
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      const user = data.user;
      localStorage.setItem('shefund_user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      const user = data.user;
      const token = data.token;
      localStorage.setItem('shefund_user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('shefund_user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Update user financial data
  const updateUserData = (newData) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      ...newData,
      financialData: {
        ...currentUser.financialData,
        ...newData.financialData
      }
    };
    
    // Update localStorage
    localStorage.setItem('shefund_user', JSON.stringify(updatedUser));
    
    // Update all users data
    const existingUsers = JSON.parse(localStorage.getItem('shefund_users') || '[]');
    const updatedUsers = existingUsers.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    localStorage.setItem('shefund_users', JSON.stringify(updatedUsers));
    
    setCurrentUser(updatedUser);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

