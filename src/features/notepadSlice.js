import { createSlice } from "@reduxjs/toolkit";

// Sample notes data
const initialNotes = [
  {
    id: "note-1",
    emailId: "inbox-1",
    title: "Welcome email",
    content: "Need to follow up about account setup",
    color: "#fff8e1", // Light yellow
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    pinned: true
  },
  {
    id: "note-2",
    emailId: "inbox-2",
    title: "Monthly newsletter",
    content: "Check new product features mentioned in section 3",
    color: "#e3f2fd", // Light blue
    createdAt: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    pinned: false
  },
  {
    id: "note-3",
    emailId: "important-1",
    title: "Security alert",
    content: "Need to change password and enable 2FA",
    color: "#ffebee", // Light red
    createdAt: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    pinned: true
  }
];

// Notepad slice
export const notepadSlice = createSlice({
  name: "notepad",
  initialState: {
    notes: initialNotes,
    showNotepad: false,
    activeNote: null,
    editMode: false,
  },
  reducers: {
    toggleNotepad: (state) => {
      state.showNotepad = !state.showNotepad;
      state.editMode = false;
      state.activeNote = null;
    },
    closeNotepad: (state) => {
      state.showNotepad = false;
      state.editMode = false;
      state.activeNote = null;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
      state.editMode = false;
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    addNote: (state, action) => {
      const newNote = {
        id: `note-${Date.now()}`,
        emailId: action.payload.emailId || null,
        title: action.payload.title || "New Note",
        content: action.payload.content || "",
        color: action.payload.color || "#ffffff",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        pinned: false
      };
      state.notes.unshift(newNote);
      state.activeNote = newNote.id;
      state.editMode = true;
    },
    updateNote: (state, action) => {
      const { id, ...updates } = action.payload;
      const noteIndex = state.notes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          ...updates,
          updatedAt: Date.now()
        };
      }
    },
    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
      if (state.activeNote === noteId) {
        state.activeNote = state.notes.length > 0 ? state.notes[0].id : null;
        state.editMode = false;
      }
    },
    togglePinNote: (state, action) => {
      const noteId = action.payload;
      const note = state.notes.find(note => note.id === noteId);
      if (note) {
        note.pinned = !note.pinned;
      }
    }
  },
});

// Export notepad actions and selectors
export const {
  toggleNotepad,
  closeNotepad,
  setActiveNote,
  toggleEditMode,
  addNote,
  updateNote,
  deleteNote,
  togglePinNote
} = notepadSlice.actions;

export const selectNotes = (state) => state.notepad.notes;
export const selectPinnedNotes = (state) => state.notepad.notes.filter(note => note.pinned);
export const selectUnpinnedNotes = (state) => state.notepad.notes.filter(note => !note.pinned);
export const selectShowNotepad = (state) => state.notepad.showNotepad;
export const selectActiveNote = (state) => {
  const activeNoteId = state.notepad.activeNote;
  return activeNoteId ? state.notepad.notes.find(note => note.id === activeNoteId) : null;
};
export const selectEditMode = (state) => state.notepad.editMode;

export default notepadSlice.reducer; 