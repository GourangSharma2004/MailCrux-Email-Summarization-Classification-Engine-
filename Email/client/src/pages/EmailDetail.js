import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { 
  FiArrowLeft, 
  FiTrash2, 
  FiArchive, 
  FiStar, 
  FiAlertCircle,
  FiPaperclip,
  FiExternalLink
} from 'react-icons/fi';

const EmailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/emails/${id}`);
        setEmail(data);
        
        // If email is not read, mark it as read
        if (!data.isRead) {
          await axios.put(`/api/emails/${id}/read`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch email details', err);
        setError('Failed to load email. Please try again.');
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !email) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || 'Email not found'}</p>
            <button 
              onClick={() => navigate('/inbox')}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Go back to inbox
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Email actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-neutral-600 hover:text-primary"
        >
          <FiArrowLeft className="mr-1" />
          <span>Back</span>
        </button>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600" title="Archive">
            <FiArchive />
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600" title="Delete">
            <FiTrash2 />
          </button>
          <button 
            className={`p-2 rounded-full hover:bg-neutral-100 ${email.importance >= 70 ? 'text-important' : 'text-neutral-600'}`} 
            title="Star"
          >
            <FiStar />
          </button>
        </div>
      </div>
      
      {/* Email content */}
      <div className="bg-white rounded-lg shadow-card p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {email.subject || '(No subject)'}
          </h1>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {email.from.name ? (
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-medium">
                  {email.from.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xl font-medium">
                  {email.from.email.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-neutral-900">
                    {email.from.name || email.from.email}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {email.from.email}
                  </p>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-neutral-500">
                    {format(new Date(email.date), 'MMM d, yyyy h:mm a')}
                  </span>
                  
                  <div className="flex items-center mt-1">
                    <span className={`category-badge category-badge-${email.category.toLowerCase()} mr-2`}>
                      {email.category}
                    </span>
                    
                    <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">
                      {email.importance}% important
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-neutral-600">
                  To: {email.to.map(recipient => recipient.name || recipient.email).join(', ')}
                </p>
                
                {email.cc && email.cc.length > 0 && (
                  <p className="text-sm text-neutral-600">
                    Cc: {email.cc.map(recipient => recipient.name || recipient.email).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="border-t pt-6">
          {email.body.html ? (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: email.body.html }} 
            />
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-neutral-800">
              {email.body.text}
            </pre>
          )}
        </div>
        
        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Attachments</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {email.attachments.map((attachment, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-4 flex items-center">
                  <div className="mr-3 bg-neutral-100 p-2 rounded">
                    <FiPaperclip className="text-neutral-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-neutral-900 truncate">{attachment.filename}</p>
                    <p className="text-xs text-neutral-500">
                      {attachment.contentType}, {Math.round(attachment.size / 1024)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Analysis */}
        <div className="border-t mt-6 pt-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">AI Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Summary */}
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-neutral-900 mb-2">Summary</h4>
              <p className="text-sm text-neutral-700">
                {email.summary || 'No summary available for this email.'}
              </p>
            </div>
            
            {/* Sentiment */}
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-neutral-900 mb-2">Sentiment</h4>
              <div className="flex items-center">
                <div 
                  className={`w-4 h-4 rounded-full mr-2 ${
                    email.sentiment === 'positive' ? 'bg-green-500' : 
                    email.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                ></div>
                <span className="text-sm capitalize">{email.sentiment}</span>
              </div>
            </div>
            
            {/* Key Points */}
            {email.keyPoints && email.keyPoints.length > 0 && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-neutral-900 mb-2">Key Points</h4>
                <ul className="list-disc pl-5 text-sm text-neutral-700">
                  {email.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Action Items */}
            {email.actionItems && email.actionItems.length > 0 && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-neutral-900 mb-2">Action Items</h4>
                <ul className="list-disc pl-5 text-sm text-neutral-700">
                  {email.actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail; 