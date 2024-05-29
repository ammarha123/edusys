import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { NotesContext } from "../../context/NotesContext";

const Note = ({ note }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(NotesContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [note]);

  return (
    <div
      ref={ref}
      className={`note ${note.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            note.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{note.text}</p>
        {note.img && <img src={note.img} alt="" />}
      </div>
    </div>
  );
};

export default Note;
