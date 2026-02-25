import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "../features/mailSlice";
import userReducer from "../features/userSlice";
import notificationsReducer from "../features/notificationsSlice";
import helpReducer from "../features/helpSlice";
import settingsReducer from "../features/settingsSlice";
import keyboardShortcutsReducer from "../features/keyboardShortcutsSlice";
import notepadReducer from "../features/notepadSlice";
import sidebarReducer from "../features/sidebarSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
    notifications: notificationsReducer,
    help: helpReducer,
    settings: settingsReducer,
    keyboardShortcuts: keyboardShortcutsReducer,
    notepad: notepadReducer,
    sidebar: sidebarReducer,
  },
});
