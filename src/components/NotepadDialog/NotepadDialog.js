import React, { useState, useEffect } from 'react';
import './NotepadDialog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeNotepad,
  selectIsNotepadOpen,
  selectFilteredNotes,
  selectSelectedNote,
  selectSelectedNoteId,
  selectColorOptions,
  selectCategories,
  selectCurrentFilter,
  selectSearchQuery,
  selectSortOrder,
  openNotepad,
  addNote,
  updateNote,
  deleteNote,
  selectNote,
  pinNote,
  unpinNote,
  setSearchQuery,
  addCategory,
  filterByCategory,
  setSortOrder,
  addTagToNote,
  removeTagFromNote
} from '../../features/notepadSlice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  InputBase,
  Chip,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Badge,
  Avatar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import PushPinIcon from '@material-ui/icons/PushPin';
import PushPinOutlinedIcon from '@material-ui/icons/PushPinOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import LabelIcon from '@material-ui/icons/Label';
import ClearIcon from '@material-ui/icons/Clear';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import CategoryIcon from '@material-ui/icons/Category';
import { format } from 'date-fns';

function NotepadDialog({ open }) {
  const dispatch = useDispatch();
  const { notes, pinnedNotes } = useSelector(selectFilteredNotes);
  const selectedNote = useSelector(selectSelectedNote);
  const selectedNoteId = useSelector(selectSelectedNoteId);
  const colorOptions = useSelector(selectColorOptions);
  const categories = useSelector(selectCategories);
  const currentFilter = useSelector(selectCurrentFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  
  const [editMode, setEditMode] = useState(false);
  const [colorMenuAnchorEl, setColorMenuAnchorEl] = useState(null);
  const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState(null);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [tagMenuAnchorEl, setTagMenuAnchorEl] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [editedColor, setEditedColor] = useState('default');
  const [newTag, setNewTag] = useState('');
  const [editedTags, setEditedTags] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  
  // Initialize edit fields when selected note changes
  useEffect(() => {
    if (selectedNote && editMode) {
      setEditedTitle(selectedNote.title || '');
      setEditedContent(selectedNote.content || '');
      setEditedCategory(selectedNote.category || null);
      setEditedColor(selectedNote.color || 'default');
      setEditedTags(selectedNote.tags || []);
    }
  }, [selectedNote, editMode]);
  
  const handleClose = () => {
    dispatch(closeNotepad());
    setEditMode(false);
  };
  
  const handleAddNote = () => {
    const newNote = {
      title: '',
      content: '',
      color: 'default',
      category: currentFilter !== 'all' ? currentFilter : null
    };
    dispatch(addNote(newNote));
    setTimeout(() => {
      setEditMode(true);
    }, 100);
  };
  
  const handleNoteClick = (noteId) => {
    dispatch(selectNote(noteId));
    setEditMode(false);
  };
  
  const handleEditClick = () => {
    if (selectedNote) {
      setEditedTitle(selectedNote.title || '');
      setEditedContent(selectedNote.content || '');
      setEditedCategory(selectedNote.category || null);
      setEditedColor(selectedNote.color || 'default');
      setEditedTags(selectedNote.tags || []);
      setEditMode(true);
    }
  };
  
  const handleSaveClick = () => {
    if (selectedNote) {
      dispatch(updateNote({
        id: selectedNote.id,
        title: editedTitle,
        content: editedContent,
        color: editedColor,
        category: editedCategory,
        tags: editedTags
      }));
      setEditMode(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
  };
  
  const handleDeleteClick = () => {
    if (selectedNote) {
      dispatch(deleteNote({ id: selectedNote.id }));
    }
  };
  
  const handlePinToggle = (id, isPinned, event) => {
    event.stopPropagation();
    if (isPinned) {
      dispatch(unpinNote({ id }));
    } else {
      dispatch(pinNote({ id }));
    }
  };
  
  const handleColorMenuOpen = (event) => {
    setColorMenuAnchorEl(event.currentTarget);
  };
  
  const handleColorMenuClose = () => {
    setColorMenuAnchorEl(null);
  };
  
  const handleColorSelect = (colorId) => {
    if (editMode) {
      setEditedColor(colorId);
    } else if (selectedNote) {
      dispatch(updateNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
        color: colorId,
        category: selectedNote.category,
        tags: selectedNote.tags
      }));
    }
    handleColorMenuClose();
  };
  
  const handleSortMenuOpen = (event) => {
    setSortMenuAnchorEl(event.currentTarget);
  };
  
  const handleSortMenuClose = () => {
    setSortMenuAnchorEl(null);
  };
  
  const handleSortSelect = (order) => {
    dispatch(setSortOrder(order));
    handleSortMenuClose();
  };
  
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };
  
  const handleFilterSelect = (categoryId) => {
    dispatch(filterByCategory(categoryId));
    handleFilterMenuClose();
  };
  
  const handleTagMenuOpen = (event) => {
    setTagMenuAnchorEl(event.currentTarget);
  };
  
  const handleTagMenuClose = () => {
    setTagMenuAnchorEl(null);
  };
  
  const handleAddTagSubmit = (e) => {
    e.preventDefault();
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag) => {
    setEditedTags(editedTags.filter(t => t !== tag));
  };
  
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      dispatch(addCategory({
        name: newCategoryName.trim(),
        icon: newCategoryIcon || '📝'
      }));
      setNewCategoryName('');
      setNewCategoryIcon('');
      setShowNewCategoryForm(false);
    }
  };
  
  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };
  
  const getColorById = (colorId) => {
    const colorOption = colorOptions.find(option => option.id === colorId);
    return colorOption ? colorOption.color : '#ffffff';
  };
  
  const getCategoryIcon = (categoryId) => {
    if (!categoryId) return null;
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : null;
  };
  
  const getCategoryName = (categoryId) => {
    if (!categoryId) return null;
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : null;
  };
  
  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
  };
  
  const renderNotesList = () => {
    return (
      <div className="notepad-notes-list">
        <div className="notepad-toolbar">
          <div className="notepad-search">
            <SearchIcon className="notepad-search-icon" />
            <InputBase
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              className="notepad-search-input"
            />
            {searchQuery && (
              <IconButton 
                size="small" 
                onClick={() => dispatch(setSearchQuery(''))}
                className="notepad-search-clear"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          
          <div className="notepad-toolbar-actions">
            <Tooltip title="Filter by category">
              <IconButton onClick={handleFilterMenuOpen} size="small">
                <Badge 
                  color="secondary" 
                  variant="dot" 
                  invisible={currentFilter === 'all'}
                >
                  <FilterListIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Sort notes">
              <IconButton onClick={handleSortMenuOpen} size="small">
                <SortIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        
        <div className="notepad-add-button-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNote}
            fullWidth
          >
            Add Note
          </Button>
        </div>
        
        {pinnedNotes.length > 0 && (
          <>
            <Typography variant="subtitle2" className="notepad-section-title">
              PINNED
            </Typography>
            <List className="notepad-notes-section">
              {pinnedNotes.map(note => (
                <ListItem
                  button
                  key={note.id}
                  className="notepad-note-item"
                  style={{ backgroundColor: getColorById(note.color) }}
                  selected={selectedNoteId === note.id}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <div className="notepad-note-content">
                    {note.category && (
                      <div className="notepad-note-category">
                        <span className="category-icon">{getCategoryIcon(note.category)}</span>
                        <span className="category-name">{getCategoryName(note.category)}</span>
                      </div>
                    )}
                    <Typography variant="subtitle1" className="notepad-note-title" noWrap>
                      {note.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" className="notepad-note-preview" noWrap>
                      {note.content || 'No content'}
                    </Typography>
                    
                    {note.tags && note.tags.length > 0 && (
                      <div className="notepad-note-tags">
                        {note.tags.slice(0, 2).map(tag => (
                          <Chip
                            key={tag}
                            size="small"
                            label={tag}
                            className="notepad-tag"
                          />
                        ))}
                        {note.tags.length > 2 && (
                          <Chip
                            size="small"
                            label={`+${note.tags.length - 2}`}
                            className="notepad-tag-more"
                          />
                        )}
                      </div>
                    )}
                    
                    <Typography variant="caption" className="notepad-note-date">
                      {formatDate(note.updatedAt)}
                    </Typography>
                  </div>
                  <IconButton
                    size="small"
                    onClick={(e) => handlePinToggle(note.id, true, e)}
                    className="notepad-pin-button"
                  >
                    <PushPinIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
        
        {notes.length > 0 && (
          <>
            <Typography variant="subtitle2" className="notepad-section-title">
              OTHERS
            </Typography>
            <List className="notepad-notes-section">
              {notes.map(note => (
                <ListItem
                  button
                  key={note.id}
                  className="notepad-note-item"
                  style={{ backgroundColor: getColorById(note.color) }}
                  selected={selectedNoteId === note.id}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <div className="notepad-note-content">
                    {note.category && (
                      <div className="notepad-note-category">
                        <span className="category-icon">{getCategoryIcon(note.category)}</span>
                        <span className="category-name">{getCategoryName(note.category)}</span>
                      </div>
                    )}
                    <Typography variant="subtitle1" className="notepad-note-title" noWrap>
                      {note.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" className="notepad-note-preview" noWrap>
                      {note.content || 'No content'}
                    </Typography>
                    
                    {note.tags && note.tags.length > 0 && (
                      <div className="notepad-note-tags">
                        {note.tags.slice(0, 2).map(tag => (
                          <Chip
                            key={tag}
                            size="small"
                            label={tag}
                            className="notepad-tag"
                          />
                        ))}
                        {note.tags.length > 2 && (
                          <Chip
                            size="small"
                            label={`+${note.tags.length - 2}`}
                            className="notepad-tag-more"
                          />
                        )}
                      </div>
                    )}
                    
                    <Typography variant="caption" className="notepad-note-date">
                      {formatDate(note.updatedAt)}
                    </Typography>
                  </div>
                  <IconButton
                    size="small"
                    onClick={(e) => handlePinToggle(note.id, false, e)}
                    className="notepad-pin-button"
                  >
                    <PushPinOutlinedIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
        
        {notes.length === 0 && pinnedNotes.length === 0 && (
          <div className="notepad-empty-state">
            <Typography variant="body1" align="center">
              No notes found
            </Typography>
            {searchQuery && (
              <Typography variant="body2" align="center" color="textSecondary">
                Try a different search term
              </Typography>
            )}
            {currentFilter !== 'all' && (
              <Typography variant="body2" align="center" color="textSecondary">
                No notes in the "{getCategoryName(currentFilter)}" category
              </Typography>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const renderNoteDetail = () => {
    if (!selectedNote) {
      return (
        <div className="notepad-empty-detail">
          <Typography variant="body1" align="center">
            Select a note or create a new one
          </Typography>
        </div>
      );
    }
    
    if (editMode) {
      return (
        <div className="notepad-note-detail" style={{ backgroundColor: getColorById(editedColor) }}>
          <div className="notepad-detail-header">
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              placeholder="Title"
              variant="outlined"
              className="notepad-title-field"
            />
            <div className="notepad-detail-actions">
              <Tooltip title="Change color">
                <IconButton onClick={handleColorMenuOpen}>
                  <ColorLensIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage tags">
                <IconButton onClick={handleTagMenuOpen}>
                  <LabelIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save">
                <IconButton onClick={handleSaveClick}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton onClick={handleCancelEdit}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          
          <FormControl variant="outlined" className="notepad-category-select">
            <InputLabel id="note-category-label">Category</InputLabel>
            <Select
              labelId="note-category-label"
              value={editedCategory || ''}
              onChange={(e) => setEditedCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  <div className="category-menu-item">
                    <span className="category-icon">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => setShowNewCategoryForm(true)}>
                <AddIcon fontSize="small" /> Add new category
              </MenuItem>
            </Select>
          </FormControl>
          
          {showNewCategoryForm && (
            <div className="new-category-form">
              <form onSubmit={handleAddCategorySubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <TextField
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      placeholder="🔖"
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name"
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      disabled={!newCategoryName.trim()}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          )}
          
          {editedTags && editedTags.length > 0 && (
            <div className="notepad-tags-container">
              {editedTags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  className="notepad-tag"
                  size="small"
                />
              ))}
            </div>
          )}
          
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            fullWidth
            multiline
            rows={12}
            placeholder="Note content"
            variant="outlined"
            className="notepad-content-field"
          />
          
          <div className="notepad-detail-footer">
            <Typography variant="caption">
              Last edited: {formatDate(selectedNote.updatedAt)}
            </Typography>
          </div>
        </div>
      );
    }
    
    return (
      <div className="notepad-note-detail" style={{ backgroundColor: getColorById(selectedNote.color) }}>
        <div className="notepad-detail-header">
          <div className="notepad-detail-title-section">
            {selectedNote.category && (
              <Chip
                icon={<CategoryIcon />}
                label={getCategoryName(selectedNote.category)}
                className="notepad-category-chip"
                size="small"
              />
            )}
            <Typography variant="h6" className="notepad-detail-title">
              {selectedNote.title || 'Untitled'}
            </Typography>
          </div>
          <div className="notepad-detail-actions">
            <Tooltip title="Edit">
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change color">
              <IconButton onClick={handleColorMenuOpen}>
                <ColorLensIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={selectedNote.isPinned ? "Unpin" : "Pin"}>
              <IconButton onClick={(e) => handlePinToggle(selectedNote.id, selectedNote.isPinned, e)}>
                {selectedNote.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        
        {selectedNote.tags && selectedNote.tags.length > 0 && (
          <div className="notepad-tags-container">
            {selectedNote.tags.map(tag => (
              <Chip
                key={tag}
                icon={<LabelOutlinedIcon />}
                label={tag}
                className="notepad-tag"
                size="small"
              />
            ))}
          </div>
        )}
        
        <Divider />
        
        <div className="notepad-detail-content">
          <Typography variant="body1">
            {selectedNote.content || "No content"}
          </Typography>
        </div>
        
        <div className="notepad-detail-footer">
          <Typography variant="caption">
            Created: {formatDate(selectedNote.createdAt)}
          </Typography>
          <Typography variant="caption">
            Last edited: {formatDate(selectedNote.updatedAt)}
          </Typography>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className="notepad-dialog"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle disableTypography className="notepad-dialog-title">
          <Typography variant="h6">Notes</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className="notepad-dialog-content">
          <div className="notepad-container">
            {renderNotesList()}
            {renderNoteDetail()}
          </div>
        </DialogContent>
      </Dialog>
      
      <Menu
        anchorEl={colorMenuAnchorEl}
        open={Boolean(colorMenuAnchorEl)}
        onClose={handleColorMenuClose}
      >
        <div className="notepad-color-menu">
          {colorOptions.map((color) => (
            <Tooltip title={color.id} key={color.id}>
              <div
                className="notepad-color-option"
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorSelect(color.id)}
              />
            </Tooltip>
          ))}
        </div>
      </Menu>
      
      <Menu
        anchorEl={sortMenuAnchorEl}
        open={Boolean(sortMenuAnchorEl)}
        onClose={handleSortMenuClose}
      >
        <MenuItem 
          onClick={() => handleSortSelect('newest')}
          selected={sortOrder === 'newest'}
        >
          Newest first
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortSelect('oldest')}
          selected={sortOrder === 'oldest'}
        >
          Oldest first
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortSelect('alphabetical')}
          selected={sortOrder === 'alphabetical'}
        >
          Alphabetical
        </MenuItem>
      </Menu>
      
      <Menu
        anchorEl={filterMenuAnchorEl}
        open={Boolean(filterMenuAnchorEl)}
        onClose={handleFilterMenuClose}
      >
        <MenuItem 
          onClick={() => handleFilterSelect('all')}
          selected={currentFilter === 'all'}
        >
          <em>All categories</em>
        </MenuItem>
        <Divider />
        {categories.map(category => (
          <MenuItem 
            key={category.id} 
            onClick={() => handleFilterSelect(category.id)}
            selected={currentFilter === category.id}
          >
            <div className="category-menu-item">
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
      
      <Menu
        anchorEl={tagMenuAnchorEl}
        open={Boolean(tagMenuAnchorEl)}
        onClose={handleTagMenuClose}
      >
        <div className="notepad-tag-menu">
          <form onSubmit={handleAddTagSubmit}>
            <TextField
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              disabled={!newTag.trim()}
              style={{ marginTop: 8 }}
            >
              Add
            </Button>
          </form>
        </div>
      </Menu>
    </>
  );
}

export default NotepadDialog; 