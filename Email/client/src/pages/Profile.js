import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiEdit, FiSave, FiUser, FiMail, FiLock } from 'react-icons/fi';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    
    // Reset form when canceling edit
    if (isEditing) {
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setError('');
      setSuccess('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    // Prepare update data
    const updateData = {
      name: profile.name
    };
    
    // Only include password fields if trying to change password
    if (profile.newPassword) {
      updateData.currentPassword = profile.password;
      updateData.newPassword = profile.newPassword;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await axios.put('/api/auth/profile', updateData);
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setLoading(false);
      
      // Reset password fields
      setProfile(prev => ({
        ...prev,
        password: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update profile');
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
        
        <button
          onClick={toggleEdit}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isEditing ? 'Cancel' : (
            <>
              <FiEdit className="mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-neutral-300' : 'border-transparent bg-neutral-50'} rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-neutral-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  disabled={true} // Email changes not allowed for security
                  className="block w-full pl-10 pr-3 py-2 border border-transparent bg-neutral-50 rounded-md"
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">Email address cannot be changed</p>
            </div>
            
            {isEditing && (
              <>
                <div className="border-t border-neutral-200 pt-4">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                        Current Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="text-neutral-500" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={profile.password}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700">
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="text-neutral-500" />
                        </div>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={profile.newPassword}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="text-neutral-500" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={profile.confirmPassword}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Account Information</h2>
        
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-neutral-500">Account Type</dt>
            <dd className="mt-1 text-sm text-neutral-900">
              {user?.googleId ? 'Google Account' : 'Email Account'}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-neutral-500">Member Since</dt>
            <dd className="mt-1 text-sm text-neutral-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-neutral-500">Last Login</dt>
            <dd className="mt-1 text-sm text-neutral-900">
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile; 