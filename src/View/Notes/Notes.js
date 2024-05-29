import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
// import { db } from "../firebase";
import Note from "./Note";
import { Autocomplete, Box, CardContent, TextField, Typography, Card, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const noteList = [
  {

    id: 1,
    title: "Amir Learner Planner",
    date: "24 April 2021",
  },
  {
    id: 2,
    title: "Implement high-quality translations and localizations for all app content, ensuring cultural nuances and language specifics are accurately reflected",
    date: "24 April 2021",
  },
  {
    id:3,
    title: "Plant Lesson Plan",
    date: "24 April 2021",
  },
  {

    id:4,
    title: "Science Y4 Lesson Plan",
    date: "24 April 2021",
  },
];

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  margin-right: 20px;
`;

const Notes = () => {
  const [notes, setMessages] = useState([]);
  // const { data } = useContext(NotesContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().notes);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  // console.log(notes);

  return (
    <>
      <Box
        id="hero"
        sx={{
          backgroundColor: '#53A2BE',

          backgroundRepeat: 'no-repeat',
          display: 'flex',
          p: '40px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            p: 2,
            mx: '90px'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Calistoga', color: 'white'
            }}
          >
          </Typography>

        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#216C94',
          padding: 2,
        }}
      >
        {/* <Box
      sx={{display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mx: '40px'}}
          width='100%'> */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80%',
            mx: '40px',
            my: '20px'
          }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: '#fff', fontFamily: 'Calistoga', mb: 2 }}
          >
            Note List
          </Typography>

          <Link to="/create-editor" style={{ textDecoration: 'none' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddCircleIcon sx={{ justifyContent: 'content', fontSize: 'small' }} />}
              sx={{

                backgroundColor: "#FFD500",
                "&:hover": {
                  backgroundColor: "#FFD500",
                },
                fontFamily: 'Calistoga',
                borderRadius: '30px',
              }}
            >
            </Button>
          </Link>
        </Box>
      </Box>
      {/* </Box> */}
      <Box>


        <Box
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#176087',
          padding: 2,
          }}

        >

          <Box sx={{
            mb: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            mx: '40px',
            my: '20px'

          }}>
            <Autocomplete
              freeSolo
              disableClearable
              size="small"
              options={noteList.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Keywords"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}

                />
              )}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            p: 2,
            backgroundColor: '#176087',
          }}

        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}

          >
            {noteList.map((note, index) => (
              <StyledCard key={note.id} >
                <CardContent>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: 'auto',
                  }}>
                    <Typography variant="h5" component="h2" sx={{ fontFamily: 'Calistoga', }}>
                      {note.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontFamily: 'Calistoga', }}>
                    {note.date}
                  </Typography>
                </CardContent>
              </StyledCard>
            ))}
          </Box>
        </Box>

      </Box>





    </>
  );
};

export default Notes;
