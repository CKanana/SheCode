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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists (simulate)
      const existingUsers = JSON.parse(localStorage.getItem('shefund_users') || '[]');
      const userExists = existingUsers.find(user => user.email === email);
      
      if (userExists) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
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
      };

      // Save to localStorage (simulate database)
      existingUsers.push(newUser);
      localStorage.setItem('shefund_users', JSON.stringify(existingUsers));
      localStorage.setItem('shefund_user', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists (simulate)
      const existingUsers = JSON.parse(localStorage.getItem('shefund_users') || '[]');
      const user = existingUsers.find(user => user.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }

      // In a real app, you would verify the password here
      // For demo purposes, we'll accept any password
      
      // Save current user session
      localStorage.setItem('shefund_user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('shefund_user');
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

