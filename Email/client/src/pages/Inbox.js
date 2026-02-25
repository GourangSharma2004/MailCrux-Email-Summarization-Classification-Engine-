import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { format } from 'date-fns';
import { 
  FiStar, 
  FiRefreshCw, 
  FiFilter, 
  FiAlertCircle, 
  FiArrowLeft, 
  FiArrowRight, 
  FiTrash2, 
  FiArchive, 
  FiMail,
  FiArrowDown,
  FiArrowUp
} from 'react-icons/fi';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterImportance, setFilterImportance] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    fetchEmails();
  }, [page, categoryFilter, searchQuery, sortOrder, filterImportance]);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = {
        page,
        limit: 20,
        sort: sortOrder
      };
      
      if (categoryFilter) params.category = categoryFilter;
      if (searchQuery) params.search = searchQuery;
      if (filterImportance > 0) params.importance = filterImportance;
      
      // Fetch emails from API
      const response = await axios.get('/api/emails', { params });
      
      setEmails(response.data.emails);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch emails', err);
      setError('Failed to load emails. Please try again.');
      setLoading(false);
    }
  };

  const handleSelectEmail = (emailId) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email._id));
    }
  };

  const handleMarkAsRead = async () => {
    if (selectedEmails.length === 0) return;
    
    try {
      // Update emails in state first for immediate feedback
      setEmails(emails.map(email => {
        if (selectedEmails.includes(email._id)) {
          return { ...email, isRead: true };
        }
        return email;
      }));
      
      // Mark emails as read in the backend
      await Promise.all(
        selectedEmails.map(id => axios.put(`/api/emails/${id}/read`))
      );
      
      setSelectedEmails([]);
    } catch (err) {
      console.error('Failed to mark emails as read', err);
      alert('Failed to update emails. Please try again.');
      // Revert optimistic update
      fetchEmails();
    }
  };

  const handleRefresh = () => {
    fetchEmails();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleImportanceFilter = (value) => {
    setFilterImportance(value);
  };

  const clearFilters = () => {
    setFilterImportance(0);
    navigate('/inbox');
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          {categoryFilter || 'Inbox'}
        </h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
          
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
              title="Filter"
            >
              <FiFilter />
            </button>
            
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-3">
              <h3 className="font-medium text-sm mb-2">Importance</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleImportanceFilter(70)}
                  className={`block w-full text-left px-2 py-1 rounded ${filterImportance === 70 ? 'bg-primary-light bg-opacity-10 text-primary' : 'hover:bg-neutral-100'}`}
                >
                  High Importance (70+)
                </button>
                <button 
                  onClick={() => handleImportanceFilter(40)}
                  className={`block w-full text-left px-2 py-1 rounded ${filterImportance === 40 ? 'bg-primary-light bg-opacity-10 text-primary' : 'hover:bg-neutral-100'}`}
                >
                  Medium Importance (40+)
                </button>
                <button 
                  onClick={() => handleImportanceFilter(0)}
                  className={`block w-full text-left px-2 py-1 rounded ${filterImportance === 0 ? 'bg-primary-light bg-opacity-10 text-primary' : 'hover:bg-neutral-100'}`}
                >
                  All Emails
                </button>
              </div>
              
              <div className="border-t mt-2 pt-2">
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Email Actions */}
      {selectedEmails.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg p-2 flex items-center">
          <span className="text-sm text-neutral-600 mr-4">
            {selectedEmails.length} selected
          </span>
          
          <button 
            onClick={handleMarkAsRead}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 mr-2"
            title="Mark as read"
          >
            <FiMail />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 mr-2"
            title="Archive"
          >
            <FiArchive />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      )}
      
      {/* Email List */}
      <div className="bg-white rounded-lg shadow-card">
        {emails.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <FiMail className="text-neutral-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No emails found</h3>
            <p className="text-neutral-600">
              {categoryFilter 
                ? `No emails in the ${categoryFilter} category.` 
                : 'Your inbox is empty or all emails are filtered out.'}
            </p>
            {(categoryFilter || filterImportance > 0 || searchQuery) && (
              <button 
                onClick={clearFilters}
                className="mt-4 text-primary hover:text-primary-dark font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="w-10 px-3 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedEmails.length === emails.length && emails.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-primary focus:ring-primary-light border-neutral-300 rounded"
                    />
                  </th>
                  <th scope="col" className="w-10 px-3 py-3 text-left">
                    <span className="sr-only">Importance</span>
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th 
                    scope="col" 
                    className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    <div className="flex items-center">
                      Date
                      {sortOrder === 'desc' ? <FiArrowDown className="ml-1" /> : <FiArrowUp className="ml-1" />}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {emails.map((email) => (
                  <tr 
                    key={email._id}
                    className={`hover:bg-neutral-50 ${!email.isRead ? 'font-medium bg-blue-50 bg-opacity-50' : ''}`}
                  >
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(email._id)}
                        onChange={() => handleSelectEmail(email._id)}
                        className="h-4 w-4 text-primary focus:ring-primary-light border-neutral-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {email.importance >= 70 && (
                        <FiStar className="text-important" />
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <Link to={`/email/${email._id}`} className="block">
                        <span className="text-sm">{email.from.name || email.from.email}</span>
                      </Link>
                    </td>
                    <td className="px-3 py-4">
                      <Link to={`/email/${email._id}`} className="block">
                        <div className="flex items-center">
                          <span className="text-sm truncate max-w-md">
                            {email.subject || '(No subject)'}
                          </span>
                          {email.summary && (
                            <span className="ml-2 text-xs text-neutral-500 truncate hidden sm:inline">
                              - {email.summary.substring(0, 50)}{email.summary.length > 50 ? '...' : ''}
                            </span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`category-badge category-badge-${email.category.toLowerCase()}`}>
                        {email.category}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {format(new Date(email.date), 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-neutral-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-neutral-700">
                      Showing page <span className="font-medium">{page}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium ${
                          page === 1 
                            ? 'text-neutral-300 cursor-not-allowed' 
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <FiArrowLeft className="h-4 w-4" />
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium ${
                              page === pageNum
                                ? 'z-10 bg-primary-light bg-opacity-10 border-primary-light text-primary'
                                : 'text-neutral-500 hover:bg-neutral-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium ${
                          page === totalPages 
                            ? 'text-neutral-300 cursor-not-allowed' 
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <FiArrowRight className="h-4 w-4" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox; 