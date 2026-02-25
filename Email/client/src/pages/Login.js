import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, getGoogleAuthUrl, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      // Auth context will handle the redirect
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const url = await getGoogleAuthUrl();
      window.location.href = url;
    } catch (err) {
      setError('Failed to connect with Google. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-card">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in to access your smart email manager
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary-light border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              <span>Sign in with Google</span>
            </button>
            
            {/* Gmail Login Button */}
            <button
              type="button"
              onClick={async () => {
                try {
                  setIsLoading(true);
                  setError('');
                  const response = await fetch('/api/auth/mock-login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: 'tmkoc3796@gmail.com' })
                  });
                  const data = await response.json();
                  if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard';
                  } else {
                    throw new Error('No token received');
                  }
                } catch (err) {
                  setError('Failed to login with your Gmail account');
                  setIsLoading(false);
                }
              }}
              className="w-full inline-flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              <span>Sign in with tmkoc3796@gmail.com</span>
            </button>
            
            {/* Mock Login Button */}
            <button
              type="button"
              onClick={async () => {
                try {
                  setIsLoading(true);
                  setError('');
                  const response = await fetch('/api/auth/mock-login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: 'demo@example.com' })
                  });
                  const data = await response.json();
                  if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard';
                  } else {
                    throw new Error('No token received');
                  }
                } catch (err) {
                  setError('Failed to use demo login');
                  setIsLoading(false);
                }
              }}
              className="w-full inline-flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100"
            >
              <span>Use Demo Account</span>
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 