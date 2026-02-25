import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Settings = () => {
  const { user, updatePreferences } = useAuth();
  
  const [preferences, setPreferences] = useState({
    emailSyncFrequency: user?.preferences?.emailSyncFrequency || 'daily',
    autoCategorizationEnabled: user?.preferences?.autoCategorizationEnabled !== false,
    summaryFrequency: user?.preferences?.summaryFrequency || 'weekly',
    notificationsEnabled: user?.preferences?.notificationsEnabled !== false,
    darkModeEnabled: user?.preferences?.darkModeEnabled || false
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus({ loading: true, success: false, error: '' });
      await updatePreferences(preferences);
      setStatus({ loading: false, success: true, error: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.toString()
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
      </div>
      
      {status.error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{status.error}</p>
            </div>
          </div>
        </div>
      )}
      
      {status.success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Settings saved successfully!</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Email Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Sync Frequency
            </label>
            <select
              name="emailSyncFrequency"
              value={preferences.emailSyncFrequency}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Summary Frequency
            </label>
            <select
              name="summaryFrequency"
              value={preferences.summaryFrequency}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="autoCategorizationEnabled"
                name="autoCategorizationEnabled"
                type="checkbox"
                checked={preferences.autoCategorizationEnabled}
                onChange={handleChange}
                className="focus:ring-primary h-4 w-4 text-primary border-neutral-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="autoCategorizationEnabled" className="font-medium text-neutral-700">
                Enable Auto-Categorization
              </label>
              <p className="text-neutral-500">Automatically categorize incoming emails using AI</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="notificationsEnabled"
                name="notificationsEnabled"
                type="checkbox"
                checked={preferences.notificationsEnabled}
                onChange={handleChange}
                className="focus:ring-primary h-4 w-4 text-primary border-neutral-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="notificationsEnabled" className="font-medium text-neutral-700">
                Enable Notifications
              </label>
              <p className="text-neutral-500">Receive notifications for important emails</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="darkModeEnabled"
                name="darkModeEnabled"
                type="checkbox"
                checked={preferences.darkModeEnabled}
                onChange={handleChange}
                className="focus:ring-primary h-4 w-4 text-primary border-neutral-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="darkModeEnabled" className="font-medium text-neutral-700">
                Dark Mode
              </label>
              <p className="text-neutral-500">Use dark theme for the application</p>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={status.loading}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {status.loading ? (
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
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 