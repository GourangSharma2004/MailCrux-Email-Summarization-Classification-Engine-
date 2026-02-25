import React from 'react';
import './KeyboardShortcutsDialog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeKeyboardShortcuts,
  selectKeyboardShortcuts,
  toggleShortcutsEnabled,
  selectShortcutsEnabled
} from '../../features/keyboardShortcutsSlice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function KeyboardShortcutsDialog({ open }) {
  const dispatch = useDispatch();
  const shortcuts = useSelector(selectKeyboardShortcuts);
  const shortcutsEnabled = useSelector(selectShortcutsEnabled);

  const handleClose = () => {
    dispatch(closeKeyboardShortcuts());
  };

  const handleToggleShortcuts = (event) => {
    dispatch(toggleShortcutsEnabled());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="keyboard-shortcuts-dialog"
      maxWidth="md"
    >
      <DialogTitle disableTypography className="keyboard-shortcuts-dialog-title">
        <Typography variant="h6">Keyboard Shortcuts</Typography>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="keyboard-shortcuts-dialog-content">
        <div className="keyboard-shortcuts-header">
          <FormControlLabel
            control={
              <Switch
                checked={shortcutsEnabled}
                onChange={handleToggleShortcuts}
                color="primary"
              />
            }
            label="Enable keyboard shortcuts"
          />
          <Typography variant="body2" className="keyboard-shortcuts-description">
            Press '?' anywhere in MailCrux to show this help dialog
          </Typography>
        </div>
        
        <div className="keyboard-shortcuts-container">
          {shortcuts.map((category, index) => (
            <div key={index} className="keyboard-shortcuts-category">
              <Typography variant="subtitle1" className="keyboard-shortcuts-category-title">
                {category.category}
              </Typography>
              <Divider />
              
              <div className="keyboard-shortcuts-list">
                {category.shortcuts.map((shortcut, idx) => (
                  <div key={idx} className="keyboard-shortcut-item">
                    <div className="keyboard-shortcut-key">
                      {shortcut.key.split('+').map((key, i) => (
                        <React.Fragment key={i}>
                          <kbd>{key.trim()}</kbd>
                          {i < shortcut.key.split('+').length - 1 && <span>+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="keyboard-shortcut-description">
                      {shortcut.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="keyboard-shortcuts-footer">
          <Typography variant="body2">
            Tip: Navigate through emails using j/k and open emails with 'o' or 'Enter'
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default KeyboardShortcutsDialog; 