import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axiosConfig';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (token) {
          try {
            // Fetch user data
            const { data } = await axios.get('/api/auth');
            setUser(data);
            setIsAuthenticated(true);
          } catch (apiError) {
            console.error('Error fetching user data:', apiError);
            
            // If we can't connect to the server but have a token,
            // provide a mock user experience for testing
            if (token.split('.').length === 3) { // Basic check for JWT format
              setUser({
                id: '123456789',
                name: 'Demo User',
                email: 'demo@example.com',
                preferences: {
                  emailSyncFrequency: 'daily',
                  autoCategorizationEnabled: true,
                  summaryFrequency: 'weekly',
                  notificationsEnabled: true
                }
              });
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('token');
              setToken(null);
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        }
        setIsInitialized(true);
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    initAuth();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      throw err.response?.data?.msg || 'Login failed';
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      throw err.response?.data?.msg || 'Registration failed';
    }
  };

  // Get Google OAuth URL
  const getGoogleAuthUrl = async () => {
    try {
      const { data } = await axios.get('/api/auth/google');
      return data.url;
    } catch (err) {
      console.error('Google auth URL error:', err);
      throw err.response?.data?.msg || 'Failed to get Google auth URL';
    }
  };

  // Set authentication token (for OAuth callbacks)
  const setAuthToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user preferences
  const updatePreferences = async (preferences) => {
    try {
      const { data } = await axios.put('/api/auth/preferences', preferences);
      setUser({ ...user, preferences: data });
      return data;
    } catch (err) {
      console.error('Update preferences error:', err);
      throw err.response?.data?.msg || 'Failed to update preferences';
    }
  };

  const value = {
    user,
    isAuthenticated,
    isInitialized,
    login,
    register,
    logout,
    getGoogleAuthUrl,
    setAuthToken,
    updatePreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 