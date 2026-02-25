import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
    activeCategory: "inbox",
    showSummary: false,
  },
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.showSummary = false;
    },
    showSummaryView: (state) => {
      state.showSummary = true;
      state.selectedMail = null;
    },
    hideSummaryView: (state) => {
      state.showSummary = false;
    },
  },
});

export const { 
  selectMail, 
  openSendMessage, 
  closeSendMessage, 
  setActiveCategory,
  showSummaryView,
  hideSummaryView
} = mailSlice.actions;

export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectActiveCategory = (state) => state.mail.activeCategory;
export const selectShowSummary = (state) => state.mail.showSummary;

export default mailSlice.reducer;
