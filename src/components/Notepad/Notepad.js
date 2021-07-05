import React, { useContext, useEffect, useState } from "react";
import { Context as NotesContext } from "../../context/NotesContext";

const Notepad = () => {
  const { state: notes, saveNote } = useContext(NotesContext);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    event.preventDefault();
    saveNote(note).finally(() => {
      setIsLoading(false);
    });
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
              {isLoading ? (
                <div className="spinner-border text-light" role="status" />
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Notepad;
