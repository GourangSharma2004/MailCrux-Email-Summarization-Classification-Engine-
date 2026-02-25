import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiSearch, FiSettings, FiUser, FiLogOut, FiRefreshCw } from 'react-icons/fi';
import axios from '../utils/axiosConfig';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleSync = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/emails/sync');
      alert('Emails synchronized successfully!');
    } catch (err) {
      console.error('Sync error:', err);
      alert('Failed to sync emails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white shadow-nav z-10">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 text-neutral-600 hover:text-primary focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <img 
              src="/logo192.png" 
              alt="Smart Email Manager" 
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-semibold text-primary hidden md:block">Smart Email</span>
          </Link>
        </div>

        <form 
          onSubmit={handleSearch} 
          className="flex-1 max-w-2xl mx-4"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emails..."
              className="w-full px-10 py-2 bg-neutral-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md transition-all"
            />
            <FiSearch className="absolute left-3 top-3 text-neutral-500" />
          </div>
        </form>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handleSync}
            className="text-neutral-600 hover:text-primary p-2 rounded-full hover:bg-neutral-100 focus:outline-none"
            disabled={isLoading}
            title="Sync emails"
          >
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
          </button>
          
          <Link 
            to="/settings"
            className="text-neutral-600 hover:text-primary p-2 rounded-full hover:bg-neutral-100 focus:outline-none"
            title="Settings"
          >
            <FiSettings />
          </Link>
          
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
            >
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {user?.name?.charAt(0) || <FiUser />}
                </div>
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                </div>
                <Link 
                  to="/profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                >
                  <FiUser className="mr-2" /> Profile
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 