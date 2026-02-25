import { createSlice } from "@reduxjs/toolkit";

// Sample notification data
const initialNotifications = [
  {
    id: "notif-1",
    title: "New message received",
    message: "You have received a new message from John Doe",
    read: false,
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    id: "notif-2",
    title: "Meeting reminder",
    message: "Team meeting starts in 30 minutes",
    read: false,
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: "notif-3",
    title: "System update",
    message: "MailCrux has been updated to the latest version",
    read: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "notif-4",
    title: "Storage limit",
    message: "You're approaching your storage limit (85% used)",
    read: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "notif-5",
    title: "New feature available",
    message: "Try out the new advanced search feature!",
    read: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
  }
];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: initialNotifications,
    showNotifications: false,
  },
  reducers: {
    toggleNotifications: (state) => {
      state.showNotifications = !state.showNotifications;
    },
    closeNotifications: (state) => {
      state.showNotifications = false;
    },
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        read: false,
        timestamp: Date.now(),
        ...action.payload,
      });
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { 
  toggleNotifications, 
  closeNotifications, 
  markAsRead, 
  markAllAsRead, 
  addNotification, 
  clearNotification 
} = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => 
  state.notifications.notifications.filter(n => !n.read).length;
export const selectShowNotifications = (state) => state.notifications.showNotifications;

export default notificationsSlice.reducer; 