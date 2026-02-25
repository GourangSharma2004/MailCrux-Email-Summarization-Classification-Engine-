import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isVisible: true, // Default to visible on larger screens
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isVisible = !state.isVisible;
    },
    showSidebar: (state) => {
      state.isVisible = true;
    },
    hideSidebar: (state) => {
      state.isVisible = false;
    }
  },
});

export const { toggleSidebar, showSidebar, hideSidebar } = sidebarSlice.actions;

export const selectSidebarVisible = (state) => state.sidebar.isVisible;

export default sidebarSlice.reducer; 