import React, { useState } from 'react';
import './EmailSummary.css';
import { useDispatch } from 'react-redux';
import { hideSummaryView } from '../../features/mailSlice';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Button, 
  Paper,
  Tab,
  Tabs,
  IconButton,
  MenuItem,
  Menu,
  Switch,
  FormControlLabel,
  LinearProgress,
  Badge,
  Tooltip,
  Avatar
} from '@material-ui/core';
import { format, subDays } from 'date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CategoryIcon from '@material-ui/icons/Category';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import TimelineIcon from '@material-ui/icons/Timeline';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EmojiObjects from '@material-ui/icons/EmojiObjects';
import SaveIcon from '@material-ui/icons/Save';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import { emailSummary } from '../../demoData';

function EmailSummary() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [summarySettings, setSummarySettings] = useState({
    showPromotions: true,
    showActionItems: true,
    enableWeeklyTrends: true,
    enableSuggestions: true,
    compactView: false
  });
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'h:mm a');
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MMM d, yyyy');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'error';
      case 'medium':
        return 'primary';
      default:
        return 'default';
    }
  };

  const handleGoToInbox = () => {
    dispatch(hideSummaryView());
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };
  
  const handleSettingChange = (setting) => {
    setSummarySettings({
      ...summarySettings,
      [setting]: !summarySettings[setting]
    });
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  
  // Email analytics data (simulated)
  const analyticsData = {
    avgResponseTime: '42 mins',
    emailsPerDay: 24,
    busyHour: '10:00 AM',
    readRate: '78%',
    topContacts: [
      { name: "Sarah Johnson", interaction: 12 },
      { name: "TechCorp Team", interaction: 8 },
      { name: "Marketing Dept", interaction: 5 }
    ],
    weeklyVolume: [
      { day: 'Mon', count: 32, prevCount: 28 },
      { day: 'Tue', count: 28, prevCount: 24 },
      { day: 'Wed', count: 36, prevCount: 30 },
      { day: 'Thu', count: 22, prevCount: 26 },
      { day: 'Fri', count: 26, prevCount: 22 },
      { day: 'Sat', count: 8, prevCount: 6 },
      { day: 'Sun', count: 6, prevCount: 4 }
    ],
    // New analytics data
    sentimentAnalysis: {
      positive: 42,
      neutral: 35,
      negative: 23
    },
    responseTimes: [
      { range: '< 10 min', count: 15 },
      { range: '10-30 min', count: 24 },
      { range: '30-60 min', count: 18 },
      { range: '1-3 hours', count: 12 },
      { range: '> 3 hours', count: 7 }
    ],
    productivityHours: [
      { hour: '9 AM', emails: 12, productivity: 85 },
      { hour: '10 AM', emails: 18, productivity: 92 },
      { hour: '11 AM', emails: 15, productivity: 88 },
      { hour: '12 PM', emails: 8, productivity: 65 },
      { hour: '1 PM', emails: 6, productivity: 50 },
      { hour: '2 PM', emails: 14, productivity: 75 },
      { hour: '3 PM', emails: 16, productivity: 82 },
      { hour: '4 PM', emails: 13, productivity: 78 }
    ],
    communicationNetwork: [
      { team: 'Product', sent: 18, received: 23 },
      { team: 'Engineering', sent: 26, received: 19 },
      { team: 'Marketing', sent: 12, received: 15 },
      { team: 'Sales', sent: 9, received: 11 }
    ],
    emailLengthTrend: [
      { date: format(subDays(new Date(), 6), 'MMM dd'), avgWords: 145 },
      { date: format(subDays(new Date(), 5), 'MMM dd'), avgWords: 162 },
      { date: format(subDays(new Date(), 4), 'MMM dd'), avgWords: 157 },
      { date: format(subDays(new Date(), 3), 'MMM dd'), avgWords: 138 },
      { date: format(subDays(new Date(), 2), 'MMM dd'), avgWords: 152 },
      { date: format(subDays(new Date(), 1), 'MMM dd'), avgWords: 168 },
      { date: format(new Date(), 'MMM dd'), avgWords: 143 }
    ],
    // Weekly trends data
    weeklyTrends: {
      emailVolume: {
        current: 158,
        previous: 140,
        change: 12.9,
        trend: 'up'
      },
      responseTime: {
        current: 42,
        previous: 49,
        change: 14.3,
        trend: 'down'
      },
      importantEmails: {
        current: 36,
        previous: 36,
        change: 0,
        trend: 'flat'
      },
      readRate: {
        current: 78,
        previous: 72,
        change: 8.3,
        trend: 'up'
      },
      topSenders: [
        { name: "Sarah Johnson", current: 12, previous: 9, change: 33.3 },
        { name: "TechCorp Team", current: 8, previous: 11, change: -27.3 },
        { name: "Marketing Dept", current: 5, previous: 4, change: 25.0 }
      ],
      categoriesDistribution: [
        { name: "Primary", current: 68, previous: 64, change: 6.3 },
        { name: "Social", current: 23, previous: 19, change: 21.1 },
        { name: "Promotions", current: 52, previous: 45, change: 15.6 },
        { name: "Updates", current: 15, previous: 12, change: 25.0 }
      ]
    }
  };
  
  // Time saved estimation
  const timeSavedData = {
    autoFiltered: 18,
    autoReplied: 5,
    minutesSaved: 86,
    efficiency: '32%'
  };
  
  // Suggestions based on email patterns (simulated)
  const suggestions = [
    {
      id: 1,
      type: 'filter',
      description: 'Create filter for promotional emails from "Fashion Outlet"',
      benefit: 'Reduce inbox clutter'
    },
    {
      id: 2,
      type: 'reply',
      description: 'Set up auto-reply for interview confirmations',
      benefit: 'Save time on repetitive responses'
    },
    {
      id: 3,
      type: 'schedule',
      description: 'Schedule time for reading newsletters (10 unread)',
      benefit: 'Better information management'
    }
  ];
  
  return (
    <div className={`email-summary ${summarySettings.compactView ? 'compact-view' : ''}`}>
      <div className="email-summary-header-container">
        <div className="email-summary-title-container">
          <Typography variant="h4" className="email-summary-title">
            Your Email Summary
          </Typography>
          <Typography variant="subtitle1" className="email-summary-subtitle">
            <AccessTimeIcon fontSize="small" /> Last updated: {formatDate(new Date(emailSummary.lastUpdated))}
          </Typography>
        </div>
        
        <div className="email-summary-actions-bar">
          <Tooltip title="Refresh summary">
            <IconButton onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshIcon className={isRefreshing ? 'spin' : ''} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Summary settings">
            <IconButton onClick={handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={settingsAnchorEl}
            keepMounted
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
            className="settings-menu"
          >
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch 
                    checked={summarySettings.showPromotions}
                    onChange={() => handleSettingChange('showPromotions')}
                    color="primary"
                    size="small"
                  />
                }
                label="Show promotions"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch 
                    checked={summarySettings.showActionItems}
                    onChange={() => handleSettingChange('showActionItems')}
                    color="primary"
                    size="small"
                  />
                }
                label="Show action items"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch 
                    checked={summarySettings.enableWeeklyTrends}
                    onChange={() => handleSettingChange('enableWeeklyTrends')}
                    color="primary"
                    size="small"
                  />
                }
                label="Enable weekly trends"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch 
                    checked={summarySettings.enableSuggestions}
                    onChange={() => handleSettingChange('enableSuggestions')}
                    color="primary"
                    size="small"
                  />
                }
                label="Enable suggestions"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch 
                    checked={summarySettings.compactView}
                    onChange={() => handleSettingChange('compactView')}
                    color="primary"
                    size="small"
                  />
                }
                label="Compact view"
              />
            </MenuItem>
          </Menu>
        </div>
      </div>
      
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        className="summary-tabs"
      >
        <Tab label="Overview" icon={<CategoryIcon />} />
        <Tab label="Analytics" icon={<InsertChartOutlinedIcon />} />
        {summarySettings.enableWeeklyTrends && <Tab label="Weekly Trends" icon={<TimelineIcon />} />}
        {summarySettings.enableSuggestions && <Tab label="Suggestions" icon={<EmojiObjects />} />}
      </Tabs>
      
      {/* Loading indicator for refresh */}
      {isRefreshing && <LinearProgress className="refresh-progress" />}
      
      {/* Overview Tab Panel */}
      {activeTab === 0 && (
        <Grid container spacing={3} className="email-summary-grid">
          {/* Overview Card */}
          <Grid item xs={12} md={4}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Inbox Overview
                </Typography>
                <Divider className="card-divider" />
                
                <div className="inbox-stats">
                  <Typography variant="body1">
                    Important messages: <span className="highlight">{emailSummary.importantCount}</span>
                  </Typography>
                  
                  <Typography variant="h6" className="category-title">
                    <CategoryIcon fontSize="small" /> Categories
                  </Typography>
                  <Grid container spacing={1} className="category-chips">
                    <Grid item>
                      <Chip 
                        label={`Primary (${emailSummary.categories.primary})`} 
                        className="category-chip primary" 
                      />
                    </Grid>
                    <Grid item>
                      <Chip 
                        label={`Social (${emailSummary.categories.social})`} 
                        className="category-chip social" 
                      />
                    </Grid>
                    <Grid item>
                      <Chip 
                        label={`Promotions (${emailSummary.categories.promotions})`} 
                        className="category-chip promotions" 
                      />
                    </Grid>
                    <Grid item>
                      <Chip 
                        label={`Updates (${emailSummary.categories.updates})`} 
                        className="category-chip updates" 
                      />
                    </Grid>
                  </Grid>
                  
                  <Typography variant="h6" className="top-senders-title">
                    Top Senders
                  </Typography>
                  <List dense>
                    {emailSummary.topSenders.map((sender, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText 
                          primary={sender.name} 
                          secondary={`${sender.count} email${sender.count > 1 ? 's' : ''}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Important Emails Card */}
          <Grid item xs={12} md={8}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <PriorityHighIcon fontSize="small" /> Important Messages
                </Typography>
                <Divider className="card-divider" />
                
                <List className="important-emails-list">
                  {emailSummary.importantEmails.map((email) => (
                    <Paper key={email.id} elevation={1} className="email-summary-item">
                      <div className="email-summary-header">
                        <Typography variant="subtitle1" className="email-sender">
                          {email.from}
                        </Typography>
                        <Typography variant="body2" className="email-time">
                          {formatTime(email.timestamp)}
                        </Typography>
                      </div>
                      <Typography variant="body1" className="email-subject">
                        {email.subject}
                      </Typography>
                      <Typography variant="body2" className="email-summary-text">
                        {email.summary}
                      </Typography>
                    </Paper>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Required Card */}
          {summarySettings.showActionItems && (
            <Grid item xs={12}>
              <Card className="summary-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    <AssignmentIcon fontSize="small" /> Actions Required
                  </Typography>
                  <Divider className="card-divider" />
                  
                  <List className="actions-list">
                    {emailSummary.actionRequired.map((item) => (
                      <ListItem key={item.id} className="action-item">
                        <ListItemText 
                          primary={item.action} 
                        />
                        <Chip 
                          label={item.urgency.toUpperCase()} 
                          color={getUrgencyColor(item.urgency)} 
                          size="small" 
                          className="urgency-chip"
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Promotions Summary Card */}
          {summarySettings.showPromotions && (
            <Grid item xs={12}>
              <Card className="summary-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Promotions Summary
                  </Typography>
                  <Divider className="card-divider" />
                  
                  <Typography variant="body1" className="promotions-summary">
                    {emailSummary.promotionsSummary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {/* Time Saved Card - New Addition */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <SaveIcon fontSize="small" /> Time Saved This Week
                </Typography>
                <Divider className="card-divider" />
                
                <div className="time-saved-stats">
                  <div className="time-saved-highlight">
                    <Typography variant="h4" className="time-highlight">
                      {timeSavedData.minutesSaved}
                    </Typography>
                    <Typography variant="body1">
                      minutes saved
                    </Typography>
                  </div>
                  
                  <div className="time-saved-details">
                    <Typography variant="body1">
                      • {timeSavedData.autoFiltered} emails automatically filtered
                    </Typography>
                    <Typography variant="body1">
                      • {timeSavedData.autoReplied} auto-replies sent
                    </Typography>
                    <Typography variant="body1">
                      • {timeSavedData.efficiency} more efficient than last week
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Analytics Tab Panel */}
      {activeTab === 1 && (
        <Grid container spacing={3} className="email-summary-grid">
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <InsertChartOutlinedIcon fontSize="small" /> Email Metrics
                </Typography>
                <Divider className="card-divider" />
                
                <div className="analytics-metrics">
                  <div className="metric-item">
                    <Typography variant="body2" className="metric-label">
                      Average Response Time
                    </Typography>
                    <Typography variant="h6" className="metric-value">
                      {analyticsData.avgResponseTime}
                    </Typography>
                  </div>
                  
                  <div className="metric-item">
                    <Typography variant="body2" className="metric-label">
                      Emails Per Day
                    </Typography>
                    <Typography variant="h6" className="metric-value">
                      {analyticsData.emailsPerDay}
                    </Typography>
                  </div>
                  
                  <div className="metric-item">
                    <Typography variant="body2" className="metric-label">
                      Busiest Hour
                    </Typography>
                    <Typography variant="h6" className="metric-value">
                      {analyticsData.busyHour}
                    </Typography>
                  </div>
                  
                  <div className="metric-item">
                    <Typography variant="body2" className="metric-label">
                      Read Rate
                    </Typography>
                    <Typography variant="h6" className="metric-value">
                      {analyticsData.readRate}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Top Interactions
                </Typography>
                <Divider className="card-divider" />
                
                <List className="top-interactions-list">
                  {analyticsData.topContacts.map((contact, index) => (
                    <ListItem key={index} className="interaction-item">
                      <ListItemText 
                        primary={contact.name} 
                      />
                      <div className="interaction-bar-container">
                        <div 
                          className="interaction-bar" 
                          style={{ width: `${(contact.interaction / 15) * 100}%` }}
                        ></div>
                        <Typography variant="body2" className="interaction-count">
                          {contact.interaction}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Email Sentiment Analysis Card - New */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Email Sentiment Analysis
                </Typography>
                <Divider className="card-divider" />
                
                <div className="sentiment-container">
                  <div className="sentiment-chart">
                    <div 
                      className="sentiment-bar positive"
                      style={{ height: `${analyticsData.sentimentAnalysis.positive}%` }}
                    >
                      <span className="sentiment-value">{analyticsData.sentimentAnalysis.positive}%</span>
                    </div>
                    <div 
                      className="sentiment-bar neutral"
                      style={{ height: `${analyticsData.sentimentAnalysis.neutral}%` }}
                    >
                      <span className="sentiment-value">{analyticsData.sentimentAnalysis.neutral}%</span>
                    </div>
                    <div 
                      className="sentiment-bar negative"
                      style={{ height: `${analyticsData.sentimentAnalysis.negative}%` }}
                    >
                      <span className="sentiment-value">{analyticsData.sentimentAnalysis.negative}%</span>
                    </div>
                  </div>
                  <div className="sentiment-legend">
                    <div className="legend-item">
                      <div className="legend-color positive"></div>
                      <Typography variant="body2">Positive</Typography>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color neutral"></div>
                      <Typography variant="body2">Neutral</Typography>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color negative"></div>
                      <Typography variant="body2">Negative</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Response Time Distribution - New */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Response Time Distribution
                </Typography>
                <Divider className="card-divider" />
                
                <div className="response-time-container">
                  {analyticsData.responseTimes.map((item, index) => (
                    <div key={index} className="response-time-item">
                      <Typography variant="body2" className="response-time-label">
                        {item.range}
                      </Typography>
                      <div className="response-time-bar-container">
                        <div 
                          className="response-time-bar"
                          style={{ width: `${(item.count / 30) * 100}%` }}
                        ></div>
                        <Typography variant="body2" className="response-time-count">
                          {item.count}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Volume by Day of Week
                </Typography>
                <Divider className="card-divider" />
                
                <div className="volume-chart">
                  {analyticsData.weeklyVolume.map((day, index) => (
                    <div key={index} className="volume-bar-container">
                      <div 
                        className="volume-bar" 
                        style={{ height: `${(day.count / 40) * 100}%` }}
                      ></div>
                      <Typography variant="body2" className="volume-day">
                        {day.day}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Productivity by Hour - New */}
          <Grid item xs={12}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Productivity by Hour
                </Typography>
                <Divider className="card-divider" />
                
                <div className="productivity-chart">
                  {analyticsData.productivityHours.map((hourData, index) => (
                    <div key={index} className="productivity-hour">
                      <div className="productivity-bars">
                        <Tooltip title={`${hourData.emails} emails`}>
                          <div 
                            className="productivity-email-bar"
                            style={{ height: `${(hourData.emails / 20) * 100}%` }}
                          ></div>
                        </Tooltip>
                        <Tooltip title={`${hourData.productivity}% productivity`}>
                          <div 
                            className="productivity-score-bar"
                            style={{ height: `${hourData.productivity}%` }}
                          ></div>
                        </Tooltip>
                      </div>
                      <Typography variant="body2" className="productivity-hour-label">
                        {hourData.hour}
                      </Typography>
                    </div>
                  ))}
                </div>
                <div className="productivity-legend">
                  <div className="legend-item">
                    <div className="legend-color email-color"></div>
                    <Typography variant="body2">Email Volume</Typography>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color productivity-color"></div>
                    <Typography variant="body2">Productivity Score</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Communication Network - New */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Team Communication
                </Typography>
                <Divider className="card-divider" />
                
                <div className="communication-network">
                  {analyticsData.communicationNetwork.map((team, index) => (
                    <div key={index} className="team-communication">
                      <Typography variant="body2" className="team-name">
                        {team.team}
                      </Typography>
                      <div className="communication-bars">
                        <div className="sent-received-container">
                          <div 
                            className="sent-bar"
                            style={{ width: `${(team.sent / 30) * 100}%` }}
                          >
                            <span className="flow-label">{team.sent}</span>
                          </div>
                        </div>
                        <div className="sent-received-container">
                          <div 
                            className="received-bar"
                            style={{ width: `${(team.received / 30) * 100}%` }}
                          >
                            <span className="flow-label">{team.received}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="communication-legend">
                  <div className="legend-item">
                    <div className="legend-color sent-color"></div>
                    <Typography variant="body2">Sent</Typography>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color received-color"></div>
                    <Typography variant="body2">Received</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Email Length Trend - New */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Average Email Length (7-day trend)
                </Typography>
                <Divider className="card-divider" />
                
                <div className="email-length-trend">
                  <div className="trend-lines">
                    {analyticsData.emailLengthTrend.map((day, index) => {
                      const nextPoint = index < analyticsData.emailLengthTrend.length - 1 ? 
                        analyticsData.emailLengthTrend[index + 1].avgWords : null;
                      
                      return (
                        <React.Fragment key={index}>
                          <div 
                            className="trend-point" 
                            style={{ bottom: `${(day.avgWords / 200) * 100}%` }}
                            data-words={day.avgWords}
                          >
                            <Tooltip title={`${day.avgWords} words`}>
                              <div className="point-marker"></div>
                            </Tooltip>
                          </div>
                          
                          {nextPoint && (
                            <div 
                              className="trend-line"
                              style={{
                                bottom: `${(day.avgWords / 200) * 100}%`,
                                height: `${Math.abs(((day.avgWords - nextPoint) / 200) * 100)}%`,
                                transform: nextPoint > day.avgWords ? 'scaleY(-1)' : 'none'
                              }}
                            ></div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  
                  <div className="trend-dates">
                    {analyticsData.emailLengthTrend.map((day, index) => (
                      <Typography key={index} variant="caption" className="trend-date">
                        {day.date}
                      </Typography>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Weekly Trends Tab Panel */}
      {activeTab === 2 && summarySettings.enableWeeklyTrends && (
        <Grid container spacing={3} className="email-summary-grid">
          <Grid item xs={12}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <TrendingUpIcon fontSize="small" /> Weekly Trends Overview
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Comparing this week with previous week
                </Typography>
                <Divider className="card-divider" />
                
                <div className="trends-container">
                  <div className={`trend-item ${analyticsData.weeklyTrends.emailVolume.trend === 'up' ? 'increasing' : 'decreasing'}`}>
                    <Typography variant="h6" className="trend-label">
                      Email Volume
                    </Typography>
                    <div className="trend-icon-container">
                      {analyticsData.weeklyTrends.emailVolume.trend === 'up' ? (
                        <TrendingUpIcon />
                      ) : analyticsData.weeklyTrends.emailVolume.trend === 'down' ? (
                        <TrendingUpIcon className="trend-down" />
                      ) : null}
                      <Typography variant="body1" className={`trend-value ${analyticsData.weeklyTrends.emailVolume.trend === 'down' ? 'trend-good' : ''}`}>
                        {analyticsData.weeklyTrends.emailVolume.change > 0 ? '+' : ''}
                        {analyticsData.weeklyTrends.emailVolume.change.toFixed(1)}%
                      </Typography>
                    </div>
                    <Typography variant="body2" className="trend-description">
                      {analyticsData.weeklyTrends.emailVolume.current} emails this week vs {analyticsData.weeklyTrends.emailVolume.previous} last week
                    </Typography>
                  </div>
                  
                  <div className={`trend-item ${analyticsData.weeklyTrends.responseTime.trend === 'down' ? 'decreasing' : 'increasing'}`}>
                    <Typography variant="h6" className="trend-label">
                      Response Time
                    </Typography>
                    <div className="trend-icon-container">
                      {analyticsData.weeklyTrends.responseTime.trend === 'up' ? (
                        <TrendingUpIcon />
                      ) : analyticsData.weeklyTrends.responseTime.trend === 'down' ? (
                        <TrendingUpIcon className="trend-down" />
                      ) : null}
                      <Typography variant="body1" className={`trend-value ${analyticsData.weeklyTrends.responseTime.trend === 'down' ? 'trend-good' : ''}`}>
                        {analyticsData.weeklyTrends.responseTime.change > 0 ? '+' : ''}
                        {analyticsData.weeklyTrends.responseTime.change.toFixed(1)}%
                      </Typography>
                    </div>
                    <Typography variant="body2" className="trend-description">
                      Average {analyticsData.weeklyTrends.responseTime.current} mins vs {analyticsData.weeklyTrends.responseTime.previous} mins last week
                    </Typography>
                  </div>
                  
                  <div className={`trend-item ${analyticsData.weeklyTrends.readRate.trend === 'up' ? 'increasing' : 'decreasing'}`}>
                    <Typography variant="h6" className="trend-label">
                      Read Rate
                    </Typography>
                    <div className="trend-icon-container">
                      {analyticsData.weeklyTrends.readRate.trend === 'up' ? (
                        <TrendingUpIcon />
                      ) : analyticsData.weeklyTrends.readRate.trend === 'down' ? (
                        <TrendingUpIcon className="trend-down" />
                      ) : null}
                      <Typography variant="body1" className={`trend-value ${analyticsData.weeklyTrends.readRate.trend === 'up' ? 'trend-good' : ''}`}>
                        {analyticsData.weeklyTrends.readRate.change > 0 ? '+' : ''}
                        {analyticsData.weeklyTrends.readRate.change.toFixed(1)}%
                      </Typography>
                    </div>
                    <Typography variant="body2" className="trend-description">
                      {analyticsData.weeklyTrends.readRate.current}% read rate vs {analyticsData.weeklyTrends.readRate.previous}% last week
                    </Typography>
                  </div>
                  
                  <div className={`trend-item ${analyticsData.weeklyTrends.importantEmails.trend === 'flat' ? 'flat' : (analyticsData.weeklyTrends.importantEmails.trend === 'up' ? 'increasing' : 'decreasing')}`}>
                    <Typography variant="h6" className="trend-label">
                      Important Messages
                    </Typography>
                    <div className="trend-icon-container">
                      {analyticsData.weeklyTrends.importantEmails.trend === 'up' ? (
                        <TrendingUpIcon />
                      ) : analyticsData.weeklyTrends.importantEmails.trend === 'down' ? (
                        <TrendingUpIcon className="trend-down" />
                      ) : null}
                      <Typography variant="body1" className="trend-value">
                        {analyticsData.weeklyTrends.importantEmails.change === 0 
                          ? "No change" 
                          : `${analyticsData.weeklyTrends.importantEmails.change > 0 ? '+' : ''}${analyticsData.weeklyTrends.importantEmails.change.toFixed(1)}%`}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="trend-description">
                      {analyticsData.weeklyTrends.importantEmails.current} important emails vs {analyticsData.weeklyTrends.importantEmails.previous} last week
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Weekly Volume Comparison Chart */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Daily Email Volume Comparison
                </Typography>
                <Divider className="card-divider" />
                
                <div className="weekly-volume-comparison">
                  {analyticsData.weeklyVolume.map((day, index) => (
                    <div key={index} className="day-comparison">
                      <Typography variant="body2" className="day-label">
                        {day.day}
                      </Typography>
                      <div className="bars-container">
                        <div className="bar-labels">
                          <Typography variant="caption" className="current-week-label">
                            This Week: {day.count}
                          </Typography>
                          <Typography variant="caption" className="prev-week-label">
                            Last Week: {day.prevCount}
                          </Typography>
                        </div>
                        <div className="comparison-bars">
                          <Tooltip title={`This week: ${day.count}`}>
                            <div 
                              className="current-week-bar"
                              style={{ height: `${(day.count / 40) * 100}%` }}
                            ></div>
                          </Tooltip>
                          <Tooltip title={`Last week: ${day.prevCount}`}>
                            <div 
                              className="prev-week-bar"
                              style={{ height: `${(day.prevCount / 40) * 100}%` }}
                            ></div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color current-week"></div>
                    <Typography variant="body2">This Week</Typography>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color prev-week"></div>
                    <Typography variant="body2">Last Week</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Categories Distribution */}
          <Grid item xs={12} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Categories Distribution Change
                </Typography>
                <Divider className="card-divider" />
                
                <div className="categories-trend">
                  {analyticsData.weeklyTrends.categoriesDistribution.map((category, index) => (
                    <div key={index} className="category-trend-item">
                      <div className="category-trend-header">
                        <Chip
                          label={category.name}
                          className={`category-chip ${category.name.toLowerCase()}`}
                          size="small"
                        />
                        <Typography variant="body2" className={`category-change ${category.change > 0 ? 'positive' : category.change < 0 ? 'negative' : ''}`}>
                          {category.change > 0 ? '+' : ''}{category.change.toFixed(1)}%
                        </Typography>
                      </div>
                      <div className="category-bars">
                        <div className="category-bar-container">
                          <div 
                            className="category-bar current"
                            style={{ width: `${(category.current / 70) * 100}%` }}
                          >
                            <Typography variant="caption" className="category-count">
                              {category.current}
                            </Typography>
                          </div>
                        </div>
                        <div className="category-bar-container">
                          <div 
                            className="category-bar previous"
                            style={{ width: `${(category.previous / 70) * 100}%` }}
                          >
                            <Typography variant="caption" className="category-count">
                              {category.previous}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="category-legend">
                  <div className="legend-item">
                    <div className="legend-color current-bar"></div>
                    <Typography variant="body2">This Week</Typography>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color previous-bar"></div>
                    <Typography variant="body2">Last Week</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Top Senders Comparison */}
          <Grid item xs={12}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Top Senders Weekly Comparison
                </Typography>
                <Divider className="card-divider" />
                
                <div className="top-senders-comparison">
                  {analyticsData.weeklyTrends.topSenders.map((sender, index) => (
                    <div key={index} className="sender-comparison-item">
                      <div className="sender-info">
                        <Avatar>{sender.name.charAt(0)}</Avatar>
                        <div className="sender-details">
                          <Typography variant="body1" className="sender-name">
                            {sender.name}
                          </Typography>
                          <Typography variant="body2" className={`sender-change ${sender.change > 0 ? 'positive' : sender.change < 0 ? 'negative' : ''}`}>
                            {sender.change > 0 ? '+' : ''}{sender.change.toFixed(1)}% from last week
                          </Typography>
                        </div>
                      </div>
                      <div className="sender-bars">
                        <div className="sender-bar-container">
                          <Typography variant="caption" className="sender-week-label">
                            This Week
                          </Typography>
                          <div className="sender-bar-wrapper">
                            <div 
                              className="sender-bar current"
                              style={{ width: `${(sender.current / 15) * 100}%` }}
                            >
                              <Typography variant="body2" className="sender-count">
                                {sender.current}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="sender-bar-container">
                          <Typography variant="caption" className="sender-week-label">
                            Last Week
                          </Typography>
                          <div className="sender-bar-wrapper">
                            <div 
                              className="sender-bar previous"
                              style={{ width: `${(sender.previous / 15) * 100}%` }}
                            >
                              <Typography variant="body2" className="sender-count">
                                {sender.previous}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Suggestions Tab Panel */}
      {activeTab === 3 && summarySettings.enableSuggestions && (
        <Grid container spacing={3} className="email-summary-grid">
          <Grid item xs={12}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <EmojiObjects fontSize="small" /> Smart Suggestions
                </Typography>
                <Divider className="card-divider" />
                
                <div className="suggestions-container">
                  {suggestions.map((suggestion) => (
                    <Paper key={suggestion.id} elevation={1} className="suggestion-item">
                      <div className="suggestion-content">
                        <Typography variant="body1" className="suggestion-description">
                          {suggestion.description}
                        </Typography>
                        <Typography variant="body2" className="suggestion-benefit">
                          {suggestion.benefit}
                        </Typography>
                      </div>
                      <div className="suggestion-actions">
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          size="small"
                        >
                          Apply
                        </Button>
                      </div>
                    </Paper>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <div className="email-summary-actions">
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<ArrowForwardIcon />}
          className="go-to-inbox-btn"
          onClick={handleGoToInbox}
        >
          Go to Inbox
        </Button>
      </div>
    </div>
  );
}

export default EmailSummary; 