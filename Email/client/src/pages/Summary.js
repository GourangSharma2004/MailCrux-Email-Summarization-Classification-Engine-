import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { format } from 'date-fns';
import { 
  FiMail, 
  FiAlertCircle, 
  FiRefreshCw, 
  FiUser, 
  FiBarChart2, 
  FiClock, 
  FiCheckCircle 
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [summaryList, setSummaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchSummaries();
  }, [id]);

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      
      // Fetch list of summaries
      const listRes = await axios.get('/api/summaries');
      setSummaryList(listRes.data.summaries);
      
      // Fetch specific summary or latest
      const summaryRes = id 
        ? await axios.get(`/api/summaries/${id}`)
        : await axios.get('/api/summaries/latest');
      
      setSummary(summaryRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch summaries', err);
      setError('Failed to load summary data. Please try again.');
      setLoading(false);
    }
  };

  const generateNewSummary = async () => {
    try {
      setGenerating(true);
      const { data } = await axios.post('/api/summaries/generate', { days: 1 });
      setSummary(data);
      setSummaryList([data, ...summaryList]);
      setGenerating(false);
    } catch (err) {
      console.error('Failed to generate summary', err);
      alert('Failed to generate summary. Please try again.');
      setGenerating(false);
    }
  };

  // Prepare chart data for sentiment breakdown
  const sentimentData = summary?.insightMetrics?.sentimentBreakdown ? {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          summary.insightMetrics.sentimentBreakdown.positive,
          summary.insightMetrics.sentimentBreakdown.neutral,
          summary.insightMetrics.sentimentBreakdown.negative
        ],
        backgroundColor: [
          '#34a853', // Positive
          '#fbbc05', // Neutral
          '#ea4335'  // Negative
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  // Prepare chart data for category breakdown
  const categoryData = summary?.emailsByCategory ? {
    labels: Object.keys(summary.emailsByCategory).filter(key => summary.emailsByCategory[key].count > 0),
    datasets: [
      {
        data: Object.values(summary.emailsByCategory)
          .filter(category => category.count > 0)
          .map(category => category.count),
        backgroundColor: [
          '#d93025', // Important
          '#1a73e8', // Social
          '#188038', // Promotions
          '#e37400', // Updates
          '#8430ce', // Forums
          '#616161'  // Uncategorized
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!summary && !error) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="rounded-full bg-neutral-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <FiMail className="text-neutral-400 text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-neutral-900 mb-2">No email summaries yet</h3>
        <p className="text-neutral-600 mb-6">
          Generate your first email summary to get insights about your inbox activity.
        </p>
        <button 
          onClick={generateNewSummary}
          disabled={generating}
          className="btn-primary"
        >
          {generating ? (
            <>
              <FiRefreshCw className="animate-spin mr-2" />
              Generating Summary...
            </>
          ) : (
            <>Generate Summary</>
          )}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={fetchSummaries}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">Email Summary</h1>
        
        <div className="flex space-x-2">
          <select 
            className="bg-white border border-neutral-300 rounded-md text-sm py-1 px-3"
            value={id || (summary?._id || '')}
            onChange={(e) => {
              window.location.href = e.target.value 
                ? `/summary/${e.target.value}`
                : '/summary';
            }}
          >
            <option value="">Latest Summary</option>
            {summaryList.map(item => (
              <option key={item._id} value={item._id}>
                {format(new Date(item.date), 'MMM d, yyyy')}
              </option>
            ))}
          </select>
          
          <button 
            onClick={generateNewSummary}
            disabled={generating}
            className="btn-primary flex items-center"
          >
            {generating ? (
              <>
                <FiRefreshCw className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <FiRefreshCw className="mr-2" />
                Generate New
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Summary date and overview */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          {summary.timeRange && `Summary for ${format(new Date(summary.timeRange.start), 'MMM d')} - ${format(new Date(summary.timeRange.end), 'MMM d, yyyy')}`}
        </h2>
        
        <div className="text-neutral-700">
          <p className="whitespace-pre-line">{summary.overview}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <StatsCard 
            title="Total Emails" 
            value={summary.insightMetrics.totalEmails}
            icon={<FiMail className="text-primary" />}
          />
          <StatsCard 
            title="Important" 
            value={summary.insightMetrics.importantCount}
            icon={<FiBarChart2 className="text-important" />}
          />
          <StatsCard 
            title="Spam/Promo" 
            value={summary.insightMetrics.spamCount}
            icon={<FiAlertCircle className="text-secondary" />}
          />
          <StatsCard 
            title="Top Sender" 
            value={summary.insightMetrics.topSenders.length > 0 ? summary.insightMetrics.topSenders[0].email.split('@')[0] : 'None'}
            icon={<FiUser className="text-social" />}
          />
        </div>
      </div>
      
      {/* Action Items */}
      {summary.actionItems && summary.actionItems.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Action Items</h2>
          
          <ul className="space-y-3">
            {summary.actionItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheckCircle className="text-primary h-5 w-5 mr-3" />
                </div>
                <span className="text-neutral-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Categories */}
        {categoryData && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Email Categories</h2>
            <div className="h-64 flex justify-center">
              <Pie data={categoryData} />
            </div>
          </div>
        )}
        
        {/* Sentiment Analysis */}
        {sentimentData && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Sentiment Analysis</h2>
            <div className="h-64 flex justify-center">
              <Pie data={sentimentData} />
            </div>
          </div>
        )}
      </div>
      
      {/* Important Emails */}
      {summary.importantEmails && summary.importantEmails.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Important Emails</h2>
          
          <div className="space-y-4">
            {summary.importantEmails.map((item) => (
              <div key={item.email} className="border-b border-neutral-200 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <Link 
                    to={`/email/${item.email}`}
                    className="text-md font-medium text-neutral-900 hover:text-primary"
                  >
                    {item.summary || 'No subject'}
                  </Link>
                  <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">
                    {item.importance}% important
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Top Senders */}
      {summary.insightMetrics.topSenders && summary.insightMetrics.topSenders.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Top Senders</h2>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {summary.insightMetrics.topSenders.map((sender, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {sender.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {sender.count} emails
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center">
      <div className="rounded-full bg-primary-light bg-opacity-10 p-3 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-xl font-bold text-neutral-900">{value}</p>
      </div>
    </div>
  );
};

export default Summary; 