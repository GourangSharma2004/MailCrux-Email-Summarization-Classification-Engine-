import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axiosConfig';
import { FiLoader } from 'react-icons/fi';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuth();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse the query string
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        if (!code) {
          throw new Error('No authorization code found in callback');
        }
        
        // Exchange code for token
        const { data } = await axios.post('/api/auth/google/callback', { code });
        
        if (!data.token) {
          throw new Error('No token received from server');
        }
        
        // Set the auth token
        setAuthToken(data.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Authentication failed');
      }
    };
    
    handleCallback();
  }, [location, navigate, setAuthToken]);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-neutral-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <FiLoader className="animate-spin text-primary text-4xl mb-4" />
      <h2 className="text-xl font-medium text-neutral-700">Completing your sign in...</h2>
      <p className="text-neutral-500 mt-2">You'll be redirected shortly</p>
    </div>
  );
};

export default AuthCallback; 