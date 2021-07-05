import createDataContext from "./createDataContext";
import { retrieveNotes, createNote, updateNote } from "../api/notesApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "get_notes":
      if (action.payload.length > 0) {
        // The first note is selected by default
        action.payload[0].selected = true;
      }
      return [...action.payload];
    case "add_note":
      const updatedNotes = state.map((note) => {
        note.selected = false;
        return note;
      });
      const newNote = { ...action.payload, selected: true };
      // Adding the new note at the beginning of the array
      updatedNotes.unshift(newNote);
      return [...updatedNotes];
    case "save_note":
      const filteredNotes = state.filter(
        (note) => note.id !== action.payload.id
      );
      const savedNote = { ...action.payload, selected: true };
      // Adding the new note at the beginning of the array
      filteredNotes.unshift(savedNote);
      return [...filteredNotes];
    case "select_note":
      const refreshedNotes = state.map((note) => {
        if (note.id === action.payload) {
          note.selected = true;
        } else {
          note.selected = false;
        }
        return note;
      });
      return [...refreshedNotes];
    default:
      return state;
  }
};

const addNote = (dispatch) => {
  return async () => {
    let note = {};
    try {
      note = await createNote();
    } catch (err) {
      console.error("Future improvement: manage errors here.");
    }
    dispatch({ type: "add_note", payload: note });
  };
};

const saveNote = (dispatch) => {
  return async ({ id, body }) => {
    let note = {};
    try {
      note = await updateNote(id, body);
    } catch (err) {
      console.error("Future improvement: manage errors here.");
    }
    dispatch({ type: "save_note", payload: note });
  };
};

const getNotes = (dispatch) => {
  return async () => {
    let notes = [];
    try {
      notes = await retrieveNotes();
    } catch (err) {
      console.error("Future improvement: manage errors here.");
    }
    dispatch({ type: "get_notes", payload: notes });
  };
};

const selectNote = (dispatch) => {
  return (id) => {
    dispatch({ type: "select_note", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    addNote,
    saveNote,
    getNotes,
    selectNote,
  },
  []
);
