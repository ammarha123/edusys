import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import { db } from "../firebase";
import Note from "./Note";

const Notes = () => {
  const [notes, setMessages] = useState([]);
  const { data } = useContext(NotesContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().notes);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(notes);

  return (
    <div className="notes">
      {notes.map((m) => (
        <Note note={m} key={m.id} />
      ))}
    </div>
  );
};

export default Notes;
