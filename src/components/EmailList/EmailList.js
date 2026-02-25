import { Checkbox, IconButton, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSummaryView, hideSummaryView, selectShowSummary, selectActiveCategory } from "../../features/mailSlice";
import { toggleKeyboardShortcuts, selectShowKeyboardShortcuts } from "../../features/keyboardShortcutsSlice";
import "./EmailList.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RedoIcon from "@material-ui/icons/Redo";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SummarizeIcon from "@material-ui/icons/Description";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import EmailSummary from "../EmailSummary/EmailSummary";
import KeyboardShortcutsDialog from "../KeyboardShortcutsDialog/KeyboardShortcutsDialog";

function EmailList({ emails }) {
  const dispatch = useDispatch();
  const showSummary = useSelector(selectShowSummary);
  const showKeyboardShortcuts = useSelector(selectShowKeyboardShortcuts);
  const activeCategory = useSelector(selectActiveCategory);
  const [selectedTab, setSelectedTab] = useState("primary");
  
  // Set the tab based on the active category
  useEffect(() => {
    // If we're in a social, promotions or primary category, set the tab to that
    if (["social", "promotions", "primary"].includes(activeCategory)) {
      setSelectedTab(activeCategory);
    } else {
      // For other categories like inbox, orders, etc., default to primary tab
      setSelectedTab("primary");
    }
  }, [activeCategory]);

  const handleShowSummary = () => {
    dispatch(showSummaryView());
  };

  const handleHideSummary = () => {
    dispatch(hideSummaryView());
  };

  const handleKeyboardShortcutsClick = () => {
    dispatch(toggleKeyboardShortcuts());
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Filter emails based on the selected tab only when viewing inbox
  const filteredEmails = emails?.filter(email => {
    // When viewing a specific category (like orders, starred, etc.), don't filter by tab
    if (activeCategory !== "inbox") {
      return true;
    }
    
    // When in inbox and a tab is selected, filter by that tab's category
    if (!email.data.category) return selectedTab === "primary";
    return email.data.category.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          {showSummary ? (
            <Button 
              onClick={handleHideSummary}
              className="summary-toggle-button"
              color="primary"
            >
              Show Full Inbox
            </Button>
          ) : (
            <Button 
              onClick={handleShowSummary}
              startIcon={<SummarizeIcon />}
              className="summary-toggle-button"
              color="primary"
            >
              Show Summary
            </Button>
          )}
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={handleKeyboardShortcutsClick}>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      {showSummary ? (
        <EmailSummary />
      ) : (
        <>
          {/* Only show the tabs when viewing the inbox category */}
          {activeCategory === "inbox" && (
            <div className="emailList__sections">
              <Section 
                Icon={InboxIcon} 
                title="Primary" 
                color="#1A73E8" 
                selected={selectedTab === "primary"} 
                onClick={() => handleTabChange("primary")}
              />
              <Section 
                Icon={PeopleIcon} 
                title="Connections" 
                color="#4285F4" 
                selected={selectedTab === "social"} 
                onClick={() => handleTabChange("social")}
              />
              <Section 
                Icon={LocalOfferIcon} 
                title="Promotions" 
                color="#34A853" 
                selected={selectedTab === "promotions"} 
                onClick={() => handleTabChange("promotions")}
              />
      </div>
          )}

          <div className="emailList__list">
            {filteredEmails?.length > 0 ? (
              filteredEmails.map(({ id, data: { to, from, subject, message, timestamp, read } }) => (
          <EmailRow
            id={id}
            key={id}
                  title={from || to}
            subject={subject}
                  description={message.substring(0, 100) + (message.length > 100 ? "..." : "")}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
                  isUnread={read === false}
          />
              ))
            ) : (
              <div className="emailList__empty">
                <p>No emails in this category</p>
              </div>
            )}
      </div>
        </>
      )}

      <KeyboardShortcutsDialog open={showKeyboardShortcuts} />
    </div>
  );
}

export default EmailList;
