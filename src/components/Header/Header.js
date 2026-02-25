import React, { useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton, Badge } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";
import { toggleNotifications, selectUnreadCount, selectShowNotifications } from "../../features/notificationsSlice";
import { toggleHelp, selectShowHelp } from "../../features/helpSlice";
import { toggleSettings, selectShowSettings } from "../../features/settingsSlice";
import { toggleKeyboardShortcuts, selectShowKeyboardShortcuts } from "../../features/keyboardShortcutsSlice";
import { toggleSidebar } from "../../features/sidebarSlice";
import NotificationPopover from "../NotificationPopover/NotificationPopover";
import HelpPopover from "../HelpPopover/HelpPopover";
import SettingsDialog from "../SettingsDialog/SettingsDialog";
import KeyboardShortcutsDialog from "../KeyboardShortcutsDialog/KeyboardShortcutsDialog";
import { auth } from "../../firebase.js";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const unreadCount = useSelector(selectUnreadCount);
  const showNotifications = useSelector(selectShowNotifications);
  const showHelp = useSelector(selectShowHelp);
  const showSettings = useSelector(selectShowSettings);
  const showKeyboardShortcuts = useSelector(selectShowKeyboardShortcuts);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    dispatch(toggleNotifications());
  };

  const handleHelpClick = (event) => {
    setHelpAnchorEl(event.currentTarget);
    dispatch(toggleHelp());
  };

  const handleSettingsClick = () => {
    dispatch(toggleSettings());
  };

  const handleKeyboardShortcutsClick = () => {
    dispatch(toggleKeyboardShortcuts());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton onClick={handleToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <img src="/new.png" alt="Login Logo" />
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className="header__inputCaret" />
      </div>
      <div className="header__right">
        <IconButton onClick={handleHelpClick}>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <Avatar onClick={signOut} src={user?.photoUrl} />
      </div>

      {showNotifications && (
        <NotificationPopover anchorEl={notificationAnchorEl} />
      )}

      {showHelp && (
        <HelpPopover anchorEl={helpAnchorEl} />
      )}

      <SettingsDialog open={showSettings} />
      <KeyboardShortcutsDialog open={showKeyboardShortcuts} />
    </div>
  );
}

export default Header;
