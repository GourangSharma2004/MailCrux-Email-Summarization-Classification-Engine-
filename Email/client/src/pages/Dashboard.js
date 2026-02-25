import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { FiMail, FiStar, FiFileText, FiBarChart2, FiClock, FiAlertCircle } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmails: 0,
    importantEmails: 0,
    spamEmails: 0,
    categories: {
      Important: 0,
      Social: 0,
      Promotions: 0,
      Updates: 0,
      Forums: 0
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch latest summary
        const summaryRes = await axios.get('/api/summaries/latest');
        setSummary(summaryRes.data);
        
        // Fetch email category stats
        const statsRes = await axios.get('/api/emails/categories/count');
        setStats(prevStats => ({
          ...prevStats,
          totalEmails: Object.values(statsRes.data).reduce((acc, curr) => acc + curr, 0),
          categories: statsRes.data
        }));
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare chart data
  const categoryData = {
    labels: ['Important', 'Social', 'Promotions', 'Updates', 'Forums'],
    datasets: [
      {
        data: [
          stats.categories.Important || 0,
          stats.categories.Social || 0,
          stats.categories.Promotions || 0,
          stats.categories.Updates || 0,
          stats.categories.Forums || 0
        ],
        backgroundColor: [
          '#d93025', // Important
          '#1a73e8', // Social
          '#188038', // Promotions
          '#e37400', // Updates
          '#8430ce'  // Forums
        ],
        borderWidth: 1,
      },
    ],
  };

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

  // Busy periods chart
  const busyPeriodsData = summary?.insightMetrics?.busyPeriods ? {
    labels: summary.insightMetrics.busyPeriods.map(period => `${period.hour}:00`),
    datasets: [
      {
        label: 'Emails received',
        data: summary.insightMetrics.busyPeriods.map(period => period.count),
        backgroundColor: '#1a73e8',
      },
    ],
  } : null;

  const busyPeriodsOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
              onClick={() => window.location.reload()}
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
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Emails" 
          value={stats.totalEmails}
          icon={<FiMail className="text-primary" />}
        />
        <StatsCard 
          title="Important Emails" 
          value={summary?.insightMetrics?.importantCount || 0}
          icon={<FiStar className="text-important" />}
        />
        <StatsCard 
          title="Spam Emails" 
          value={summary?.insightMetrics?.spamCount || 0}
          icon={<FiAlertCircle className="text-secondary" />}
        />
        <StatsCard 
          title="Last 24 Hours" 
          value={summary ? summary.insightMetrics.totalEmails : 0}
          icon={<FiClock className="text-updates" />}
        />
      </div>
      
      {/* Summary Section */}
      {summary && (
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Daily Summary</h2>
              <p className="text-sm text-neutral-500">
                {summary.timeRange && `${format(new Date(summary.timeRange.start), 'MMM d, yyyy')} - ${format(new Date(summary.timeRange.end), 'MMM d, yyyy')}`}
              </p>
            </div>
            <Link to="/summary" className="text-sm text-primary hover:text-primary-dark font-medium">
              View Full Summary
            </Link>
          </div>
          
          <div className="mt-4 text-neutral-700">
            <p>{summary.overview}</p>
          </div>
          
          {summary.actionItems && summary.actionItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-medium text-neutral-900 mb-2">Action Items</h3>
              <ul className="space-y-2">
                {summary.actionItems.slice(0, 3).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-light bg-opacity-10 text-primary text-xs font-medium mr-2">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
                {summary.actionItems.length > 3 && (
                  <li className="text-sm text-primary hover:text-primary-dark font-medium">
                    <Link to="/summary">
                      + {summary.actionItems.length - 3} more action items
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Email Categories</h2>
          <div className="h-64 flex justify-center">
            <Pie data={categoryData} />
          </div>
        </div>
        
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
      
      {/* Busy Periods */}
      {busyPeriodsData && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Busy Hours</h2>
          <div className="h-64">
            <Bar data={busyPeriodsData} options={busyPeriodsOptions} />
          </div>
        </div>
      )}
      
      {/* Important Emails */}
      {summary?.importantEmails && summary.importantEmails.length > 0 && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Important Emails</h2>
            <Link to="/inbox?category=Important" className="text-sm text-primary hover:text-primary-dark font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {summary.importantEmails.slice(0, 3).map((item) => (
              <Link 
                key={item.email} 
                to={`/email/${item.email}`}
                className="block p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.summary}</span>
                  <span className="text-sm text-neutral-500">
                    <span className="inline-block h-2 w-2 rounded-full bg-important mr-1"></span>
                    {item.importance}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="card flex items-center p-6">
      <div className="rounded-full bg-primary-light bg-opacity-10 p-3 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard; 