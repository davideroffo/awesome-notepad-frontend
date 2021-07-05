import React, { useContext, useEffect, useState } from "react";
import { Context as NotesContext } from "../../context/NotesContext";

const Notepad = () => {
  const { state: notes, saveNote } = useContext(NotesContext);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const selectedNote = notes.find((note) => note.selected === true);
    setNote(selectedNote);
  }, [notes]);

  const handleTextChange = (event) => {
    const { value } = event.target;
    setNote({ ...note, body: value });
  };

  const handleSaveNote = (event) => {
    event.preventDefault();
    saveNote(note);
  };

  return (
    <div className="container">
      {!note && (
        <div className="alert alert-warning" role="alert">
          Notepad currently disabled. Add a note to START!
        </div>
      )}

      <form onSubmit={handleSaveNote}>
        <div className="form-group">
          <textarea
            className="form-control my-2"
            id="notepad-text-area"
            rows="10"
            disabled={!note}
            value={note ? note.body : ""}
            onChange={handleTextChange}
          />
          <div className="row">
            <button
              className="btn btn-success btn-lg mx-2"
              type="submit"
              disabled={!note}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Notepad;
