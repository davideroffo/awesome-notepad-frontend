import React, { useEffect, useContext } from "react";
import { Context as NotesContext } from "./context/NotesContext";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Notepad from "./components/Notepad/Notepad";

function App() {
  const { getNotes } = useContext(NotesContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className="flexbox-container">
        <div className="sidebar-item">
          <Sidebar />
        </div>
        <div className="notepad-body d-flex flex-column align-items-stretch justify-content-between">
          <Notepad />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
