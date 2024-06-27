import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { NotesContext } from "../../context/NotesContext";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Note = ({ note }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(NotesContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [note]);

  return (
    <>
      <Link to={`/edit-note/${note.id}`}></Link>
      <Box>
        <Typography variant="h5" component="h2" sx={{ fontFamily: 'Calistoga' }}>
          {note.title.length > 40 ? (note.title.substring(0,40)) + "..." : note.title}
        </Typography>

      </Box>
    </>
    // <div
    //   ref={ref}
    //   className={`note ${note.senderId === currentUser.uid && "owner"}`}
    // >
    // <Typography>hi</Typography>
    //   <div className="messageInfo">
    //     <img
    //       src={
    //         note.senderId === currentUser.uid
    //           ? currentUser.photoURL
    //           : data.user.photoURL
    //       }
    //       alt=""
    //     />
    //     <span>just now</span>
    //   </div>
    //   <div className="messageContent">
    //     <p>{note.text}</p>
    //     {note.img && <img src={note.img} alt="" />}
    //   </div>
    // </div>
  );
};

export default Note;
