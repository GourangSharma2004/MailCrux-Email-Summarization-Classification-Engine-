import { createSlice } from "@reduxjs/toolkit";

// Sample help data
const helpItems = [
  {
    id: "help-1",
    title: "Getting Started",
    description: "Learn the basics of using MailCrux",
    icon: "school"
  },
  {
    id: "help-2",
    title: "Compose Emails",
    description: "Learn how to create and send emails",
    icon: "edit"
  },
  {
    id: "help-3",
    title: "Organize Your Inbox",
    description: "Tips for managing your emails efficiently",
    icon: "inbox"
  },
  {
    id: "help-4",
    title: "Keyboard Shortcuts",
    description: "Speed up your workflow with shortcuts",
    icon: "keyboard"
  },
  {
    id: "help-5",
    title: "Privacy & Security",
    description: "Keep your account and emails safe",
    icon: "security"
  },
  {
    id: "help-6",
    title: "Contact Support",
    description: "Get in touch with our support team",
    icon: "contact_support"
  }
];

export const helpSlice = createSlice({
  name: "help",
  initialState: {
    helpItems: helpItems,
    showHelp: false,
  },
  reducers: {
    toggleHelp: (state) => {
      state.showHelp = !state.showHelp;
    },
    closeHelp: (state) => {
      state.showHelp = false;
    }
  },
});

export const { toggleHelp, closeHelp } = helpSlice.actions;

export const selectHelpItems = (state) => state.help.helpItems;
export const selectShowHelp = (state) => state.help.showHelp;

export default helpSlice.reducer; 