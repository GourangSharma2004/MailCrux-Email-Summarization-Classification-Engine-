import { createSlice } from "@reduxjs/toolkit";

// Sample settings data
const initialSettings = {
  general: {
    displayDensity: "default", // default, comfortable, compact
    language: "english",
    theme: "light",
    autoReply: false,
    autoReplyMessage: "I'm currently out of office and will respond to your email upon my return.",
  },
  scheduling: {
    scheduleEnabled: true,
    defaultSendTime: "09:00",
    reminderNotifications: true,
    defaultReminderTime: "15", // minutes before meeting
    weekendEmails: false,
  },
  alarms: {
    emailAlerts: true,
    desktopNotifications: true,
    soundAlerts: false,
    reminderPopups: true,
  },
  forwarding: {
    forwardingEnabled: false,
    forwardingEmail: "",
    keepCopy: true,
  },
  labels: {
    showLabels: true,
    defaultLabels: ["important", "work", "personal", "travel"],
  }
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: initialSettings,
    showSettings: false,
    activeSettingsTab: "general", // general, scheduling, alarms, forwarding, labels
  },
  reducers: {
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
    closeSettings: (state) => {
      state.showSettings = false;
    },
    setActiveSettingsTab: (state, action) => {
      state.activeSettingsTab = action.payload;
    },
    updateGeneralSettings: (state, action) => {
      state.settings.general = {
        ...state.settings.general,
        ...action.payload,
      };
    },
    updateSchedulingSettings: (state, action) => {
      state.settings.scheduling = {
        ...state.settings.scheduling,
        ...action.payload,
      };
    },
    updateAlarmSettings: (state, action) => {
      state.settings.alarms = {
        ...state.settings.alarms,
        ...action.payload,
      };
    },
    updateForwardingSettings: (state, action) => {
      state.settings.forwarding = {
        ...state.settings.forwarding,
        ...action.payload,
      };
    },
    updateLabelSettings: (state, action) => {
      state.settings.labels = {
        ...state.settings.labels,
        ...action.payload,
      };
    },
  },
});

export const {
  toggleSettings,
  closeSettings,
  setActiveSettingsTab,
  updateGeneralSettings,
  updateSchedulingSettings,
  updateAlarmSettings,
  updateForwardingSettings,
  updateLabelSettings,
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings.settings;
export const selectShowSettings = (state) => state.settings.showSettings;
export const selectActiveSettingsTab = (state) => state.settings.activeSettingsTab;

export default settingsSlice.reducer; 