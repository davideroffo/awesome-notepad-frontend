import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as NotesProvider } from "./context/NotesContext";
import "./bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
