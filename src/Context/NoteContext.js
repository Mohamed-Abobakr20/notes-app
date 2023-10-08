import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const NoteContext = createContext();

export default function NoteContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { userToken } = useContext(UserContext);

  function addNote(values) {
    return axios.post(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      values,
      {
        headers: { token: userToken },
      }
    );
  }

  function getNotes() {
    return axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
      headers: { token: userToken },
    });
  }

  function deleteNote(id) {
    return axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      {
        headers: { token: userToken },
      }
    );
  }

  function updateNote(id, values) {
    return axios.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      values,
      {
        headers: { token: userToken },
      }
    );
  }

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, getNotes, deleteNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
}
