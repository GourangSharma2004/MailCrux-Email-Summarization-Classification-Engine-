import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-neutral-100 w-24 h-24 flex items-center justify-center mb-6">
        <FiMail className="text-neutral-400 text-4xl" />
      </div>
      
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-neutral-800 mb-6">Page Not Found</h2>
      
      <p className="text-neutral-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/dashboard" 
        className="btn-primary flex items-center"
      >
        <FiArrowLeft className="mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound; 