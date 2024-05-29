import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const CreateNote = () => {
  const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//       doc.exists() && setMessages(doc.data().notes);
//     });

//     return () => {
//       unSub();
//     };
//   }, [data.chatId]);

//   console.log(notes);

  return (
    // <div className="notes">
    // <Typography>hi</Typography>
    //   {notes.map((m) => (
    //     <Note note={m} key={m.id} />
    //   ))}
    // </div>
    <Box></Box>
  );
};

export default CreateNote;
