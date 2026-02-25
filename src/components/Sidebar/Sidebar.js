import { Button, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import PhoneIcon from "@material-ui/icons/Phone";
import SidebarOption from "./SidebarOption";
import MoreMenu from "./MoreMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSendMessage, selectActiveCategory, setActiveCategory } from "../../features/mailSlice";

function Sidebar({ allEmails }) {
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectActiveCategory);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleMoreClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };

  const handleInvoiceClick = (e) => {
    // Prevent navigation for the Invoices option
    e.preventDefault();
    // Open the invoice dialog
    setDialogType('invoice');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setDialogOpen(true);
    setMoreMenuAnchorEl(null);
  };

  return (
    <div className="sidebar">
      <Button
        className="sidebar__compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
      <Link to="/category/inbox" className="sidebar-link" onClick={() => handleCategoryClick("inbox")}>
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={allEmails?.inbox?.length || 0}
          selected={activeCategory === "inbox"}
        />
      </Link>

      <div className="sidebar-link" onClick={handleInvoiceClick}>
        <SidebarOption 
          Icon={ReceiptIcon} 
          title="Invoices" 
          number={allEmails?.starred?.length || 0} 
          selected={activeCategory === "invoices"}
        />
      </div>
      
      <Link to="/category/orders" className="sidebar-link" onClick={() => handleCategoryClick("orders")}>
        <SidebarOption 
          Icon={ShoppingBasketIcon} 
          title="Orders" 
          number={allEmails?.orders?.length || 0}
          selected={activeCategory === "orders"}
        />
      </Link>
      
      <Link to="/category/important" className="sidebar-link" onClick={() => handleCategoryClick("important")}>
        <SidebarOption 
          Icon={LabelImportantIcon} 
          title="Important" 
          number={allEmails?.important?.length || 0}
          selected={activeCategory === "important"}
        />
      </Link>
      
      <Link to="/category/sent" className="sidebar-link" onClick={() => handleCategoryClick("sent")}>
        <SidebarOption 
          Icon={NearMeIcon} 
          title="Sent" 
          number={allEmails?.sent?.length || 0}
          selected={activeCategory === "sent"}
        />
      </Link>
      
      <Link to="/category/drafts" className="sidebar-link" onClick={() => handleCategoryClick("drafts")}>
        <SidebarOption 
          Icon={NoteIcon} 
          title="Drafts" 
          number={allEmails?.drafts?.length || 0}
          selected={activeCategory === "drafts"}
        />
      </Link>

      <div onClick={handleMoreClick} className="sidebar-more-button">
      <SidebarOption Icon={ExpandMoreIcon} title="More" />
      </div>

      <MoreMenu 
        anchorEl={moreMenuAnchorEl} 
        handleClose={handleMoreMenuClose}
        dialogOpen={dialogOpen}
        dialogType={dialogType}
        handleDialogClose={handleDialogClose}
        handleDialogOpen={handleDialogOpen}
      />

      <div className="sidebar-footer">
        <div className="sidebar-footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
