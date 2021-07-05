import React, { useContext, useState } from "react";
import { Context as NotesContext } from "../../context/NotesContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { state: notes, addNote, selectNote } = useContext(NotesContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = () => {
    setIsLoading(true);
    addNote({
      id: "12345",
      body: "New note",
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleSelectNote = (noteId) => {
    console.log(noteId);
    selectNote(noteId);
  };

  const renderNotes = () => {
    return notes.map((note) => {
      return (
        <li
          className="list-group-item"
          key={note.id}
          onClick={() => handleSelectNote(note.id)}
        >
          <p className={"text-truncate " + (note.selected ? "text-info" : "")}>
            {note.body}
          </p>
        </li>
      );
    });
  };

  return (
    <div className="sidebar-body">
      <button
        className="btn btn-primary btn-block my-1"
        onClick={handleAddNote}
      >
        {isLoading ? (
          <div class="spinner-border text-info" role="status" />
        ) : (
          <p>+ Add Note</p>
        )}
      </button>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul className="list-group list-group-flush">{renderNotes()}</ul>
      )}
    </div>
  );
};

export default Sidebar;
