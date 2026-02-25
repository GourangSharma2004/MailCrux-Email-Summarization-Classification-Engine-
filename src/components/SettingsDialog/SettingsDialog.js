import React from 'react';
import './SettingsDialog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeSettings,
  selectSettings,
  selectActiveSettingsTab,
  setActiveSettingsTab,
  updateSchedulingSettings,
  updateAlarmSettings,
} from '../../features/settingsSlice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Button,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ForwardIcon from '@material-ui/icons/Forward';
import LabelIcon from '@material-ui/icons/Label';

function SettingsDialog({ open }) {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const activeTab = useSelector(selectActiveSettingsTab);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setActiveSettingsTab(newValue));
  };

  const handleSchedulingChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    dispatch(updateSchedulingSettings({ [field]: value }));
  };

  const handleAlarmChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    dispatch(updateAlarmSettings({ [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="settings-tab-content">
            <Typography variant="h6" className="settings-section-title">General Settings</Typography>
            <Divider />
            <div className="settings-section">
              <Typography variant="subtitle1">Display Density</Typography>
              <Select
                value={settings.general.displayDensity}
                className="settings-select"
                disabled
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="comfortable">Comfortable</MenuItem>
                <MenuItem value="compact">Compact</MenuItem>
              </Select>
            </div>
            <div className="settings-section">
              <Typography variant="subtitle1">Language</Typography>
              <Select
                value={settings.general.language}
                className="settings-select"
                disabled
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </Select>
            </div>
          </div>
        );
      case 'scheduling':
        return (
          <div className="settings-tab-content">
            <Typography variant="h6" className="settings-section-title">Email Scheduling</Typography>
            <Divider />
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.scheduling.scheduleEnabled}
                    onChange={handleSchedulingChange('scheduleEnabled')}
                    color="primary"
                  />
                }
                label="Enable email scheduling"
              />
              <Typography variant="body2" className="settings-description">
                Schedule emails to be sent at a later time
              </Typography>
            </div>
            <div className="settings-section">
              <Typography variant="subtitle1">Default send time</Typography>
              <TextField
                type="time"
                value={settings.scheduling.defaultSendTime}
                onChange={handleSchedulingChange('defaultSendTime')}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                className="settings-time-field"
                disabled={!settings.scheduling.scheduleEnabled}
              />
              <Typography variant="body2" className="settings-description">
                Default time to schedule emails for future delivery
              </Typography>
            </div>
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.scheduling.weekendEmails}
                    onChange={handleSchedulingChange('weekendEmails')}
                    color="primary"
                    disabled={!settings.scheduling.scheduleEnabled}
                  />
                }
                label="Allow weekend scheduling"
              />
              <Typography variant="body2" className="settings-description">
                Allow scheduling emails during weekends
              </Typography>
            </div>
          </div>
        );
      case 'alarms':
        return (
          <div className="settings-tab-content">
            <Typography variant="h6" className="settings-section-title">Alarms & Notifications</Typography>
            <Divider />
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.alarms.emailAlerts}
                    onChange={handleAlarmChange('emailAlerts')}
                    color="primary"
                  />
                }
                label="Email alerts"
              />
              <Typography variant="body2" className="settings-description">
                Get email notifications for important events
              </Typography>
            </div>
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.alarms.desktopNotifications}
                    onChange={handleAlarmChange('desktopNotifications')}
                    color="primary"
                  />
                }
                label="Desktop notifications"
              />
              <Typography variant="body2" className="settings-description">
                Show desktop notifications for new emails
              </Typography>
            </div>
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.alarms.soundAlerts}
                    onChange={handleAlarmChange('soundAlerts')}
                    color="primary"
                  />
                }
                label="Sound alerts"
              />
              <Typography variant="body2" className="settings-description">
                Play sound when new emails arrive
              </Typography>
            </div>
            <div className="settings-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.scheduling.reminderNotifications}
                    onChange={handleSchedulingChange('reminderNotifications')}
                    color="primary"
                  />
                }
                label="Meeting reminders"
              />
              <Typography variant="subtitle1">Reminder time (minutes)</Typography>
              <Select
                value={settings.scheduling.defaultReminderTime}
                onChange={handleSchedulingChange('defaultReminderTime')}
                className="settings-select"
                disabled={!settings.scheduling.reminderNotifications}
              >
                <MenuItem value="5">5 minutes</MenuItem>
                <MenuItem value="10">10 minutes</MenuItem>
                <MenuItem value="15">15 minutes</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="60">1 hour</MenuItem>
              </Select>
              <Typography variant="body2" className="settings-description">
                Send reminders before scheduled meetings
              </Typography>
            </div>
          </div>
        );
      case 'forwarding':
        return (
          <div className="settings-tab-content">
            <Typography variant="h6" className="settings-section-title">Forwarding & Auto-Reply</Typography>
            <Divider />
            <div className="settings-section">
              <Typography variant="subtitle1">Auto-forwarding is disabled</Typography>
              <Typography variant="body2" className="settings-description">
                Contact your admin to enable mail forwarding
              </Typography>
            </div>
            <div className="settings-section">
              <Typography variant="subtitle1">Auto-reply</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={false}
                    color="primary"
                    disabled
                  />
                }
                label="Enable auto-reply"
              />
              <Typography variant="body2" className="settings-description">
                Automatically respond to incoming messages
              </Typography>
            </div>
          </div>
        );
      case 'labels':
        return (
          <div className="settings-tab-content">
            <Typography variant="h6" className="settings-section-title">Labels & Categories</Typography>
            <Divider />
            <div className="settings-section">
              <Typography variant="subtitle1">Manage Labels</Typography>
              <Typography variant="body2" className="settings-description">
                This feature is not yet implemented
              </Typography>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="settings-dialog"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle disableTypography className="settings-dialog-title">
        <Typography variant="h6">Settings</Typography>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="settings-dialog-content">
        <div className="settings-container">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleTabChange}
            className="settings-tabs"
          >
            <Tab label="General" icon={<SettingsIcon />} value="general" />
            <Tab label="Scheduling" icon={<ScheduleIcon />} value="scheduling" />
            <Tab label="Alarms" icon={<NotificationsIcon />} value="alarms" />
            <Tab label="Forwarding" icon={<ForwardIcon />} value="forwarding" />
            <Tab label="Labels" icon={<LabelIcon />} value="labels" />
          </Tabs>
          
          <div className="settings-content">
            {renderTabContent()}
            
            <div className="settings-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Save Changes
              </Button>
              <Button
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog; 