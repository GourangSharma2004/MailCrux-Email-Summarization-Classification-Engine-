import React from 'react';
import './HelpPopover.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeHelp, selectHelpItems } from '../../features/helpSlice';
import { Popover, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';

function HelpPopover({ anchorEl }) {
  const dispatch = useDispatch();
  const helpItems = useSelector(selectHelpItems);
  
  const handleClose = () => {
    dispatch(closeHelp());
  };
  
  const handleHelpItemClick = (item) => {
    // In a real app, this would open a help article or documentation
    console.log(`Opening help topic: ${item.title}`);
  };
  
  const open = Boolean(anchorEl);
  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className="help-popover"
    >
      <div className="help-header">
        <h3>Help & Support</h3>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      
      <div className="help-search">
        <input type="text" placeholder="Search for help..." />
      </div>
      
      <List className="help-list">
        {helpItems.map((item) => (
          <ListItem 
            button 
            key={item.id} 
            className="help-item"
            onClick={() => handleHelpItemClick(item)}
          >
            <ListItemIcon>
              <Icon className="help-icon">{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              secondary={item.description}
              classes={{
                primary: "help-item-title",
                secondary: "help-item-description"
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <div className="help-footer">
        <a href="#" className="help-footer-link">Visit Help Center</a>
        <a href="#" className="help-footer-link">Community</a>
      </div>
    </Popover>
  );
}

export default HelpPopover; 