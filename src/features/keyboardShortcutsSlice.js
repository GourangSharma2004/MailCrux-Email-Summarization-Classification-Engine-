import { createSlice } from "@reduxjs/toolkit";

// Keyboard shortcuts data
const shortcutsData = [
  {
    category: "Common Actions",
    shortcuts: [
      { key: "c", description: "Compose new email" },
      { key: "r", description: "Reply to email" },
      { key: "a", description: "Reply all" },
      { key: "f", description: "Forward email" },
      { key: "#", description: "Delete" },
      { key: "e", description: "Archive" },
    ],
  },
  {
    category: "Navigation",
    shortcuts: [
      { key: "g + i", description: "Go to Inbox" },
      { key: "g + s", description: "Go to Starred" },
      { key: "g + d", description: "Go to Drafts" },
      { key: "g + t", description: "Go to Sent" },
      { key: "k", description: "Move to newer conversation" },
      { key: "j", description: "Move to older conversation" },
    ],
  },
  {
    category: "Actions",
    shortcuts: [
      { key: "x", description: "Select conversation" },
      { key: "s", description: "Star/unstar conversation" },
      { key: "!", description: "Mark as spam" },
      { key: "m", description: "Mute conversation" },
      { key: "l", description: "Label conversation" },
      { key: "v", description: "Move to..." },
    ],
  },
  {
    category: "Formatting",
    shortcuts: [
      { key: "Ctrl + b", description: "Bold" },
      { key: "Ctrl + i", description: "Italic" },
      { key: "Ctrl + u", description: "Underline" },
      { key: "Ctrl + k", description: "Insert link" },
      { key: "Ctrl + ;", description: "Insert emoji" },
      { key: "Ctrl + Shift + 7", description: "Numbered list" },
    ],
  },
];

// Keyboard shortcuts slice
export const keyboardShortcutsSlice = createSlice({
  name: "keyboardShortcuts",
  initialState: {
    shortcuts: shortcutsData,
    showKeyboardShortcuts: false,
    shortcutsEnabled: true,
  },
  reducers: {
    toggleKeyboardShortcuts: (state) => {
      state.showKeyboardShortcuts = !state.showKeyboardShortcuts;
    },
    closeKeyboardShortcuts: (state) => {
      state.showKeyboardShortcuts = false;
    },
    toggleShortcutsEnabled: (state) => {
      state.shortcutsEnabled = !state.shortcutsEnabled;
    },
  },
});

// Export keyboard shortcuts actions and selectors
export const {
  toggleKeyboardShortcuts,
  closeKeyboardShortcuts,
  toggleShortcutsEnabled,
} = keyboardShortcutsSlice.actions;

export const selectKeyboardShortcuts = (state) => state.keyboardShortcuts.shortcuts;
export const selectShowKeyboardShortcuts = (state) => state.keyboardShortcuts.showKeyboardShortcuts;
export const selectShortcutsEnabled = (state) => state.keyboardShortcuts.shortcutsEnabled;

export default keyboardShortcutsSlice.reducer; 