import React from 'react';
import './NotificationPopover.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
  closeNotifications, 
  markAllAsRead, 
  markAsRead, 
  clearNotification,
  selectNotifications 
} from '../../features/notificationsSlice';
import { Popover, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function NotificationPopover({ anchorEl }) {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  
  const handleClose = () => {
    dispatch(closeNotifications());
  };
  
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };
  
  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };
  
  const handleClearNotification = (notificationId, event) => {
    event.stopPropagation();
    dispatch(clearNotification(notificationId));
  };
  
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    // Otherwise return date
    return new Date(timestamp).toLocaleDateString();
  };
  
  const open = Boolean(anchorEl);
  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className="notification-popover"
    >
      <div className="notification-header">
        <h3>Notifications</h3>
        <div className="notification-actions">
          <Button
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllAsRead}
            size="small"
          >
            Mark all as read
          </Button>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`notification-item ${notification.read ? '' : 'notification-unread'}`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-time">{formatTimestamp(notification.timestamp)}</div>
              </div>
              <IconButton 
                size="small" 
                className="notification-delete"
                onClick={(e) => handleClearNotification(notification.id, e)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          ))
        )}
      </div>
    </Popover>
  );
}

export default NotificationPopover; 