<<<<<<< Updated upstream
import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import backgroundImage from "../Components/chatbot-background.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Chatbot() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "200px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        md={4}
        elevation={4}
        sx={{
          height: "479px",
          width: "479px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#53A2BE", // Set the background color
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <Typography component="h1" variant="h5" padding="20px" margin="10px">
            Chatbot
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password">Input</FormLabel>
              <OutlinedInput
                placeholder=""
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              height: "63px",
              width: "243px",
              backgroundColor: "#176087",
              "&:hover": {
                backgroundColor: "#14506E",
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password">Output</FormLabel>
              {/* {answer} */}
              <OutlinedInput
                value={answer}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
=======
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Components/Message';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function Chatbot() {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['New Chat', 'Editor',].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <AddCircleIcon /> : <EditNoteIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{fontFamily: 'Calistoga'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{my: 2, mx: 2,}}>
                <Typography variant="h6" sx={{ fontFamily: 'Calistoga'}}>Chat History</Typography>
                {['History1', 'History2', 'History3'].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemButton>
                            <ListItemText primary={text} sx={{ fontFamily: 'Calistoga'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const messagesListRef = React.createRef();
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = (content) => {
        // add the message to the state
        setMessages([
            ...messages,
            {
                content: content,
                isCustomer: true,
            }
        ]);

        // TODO: post the request to Back4app
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        sendMessage(messageInput);
        setMessageInput("");
    }

    return (

        <Box Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#53A2BE', },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Box>
                    <Box
                        ref={messagesListRef}
                        sx={{
                            height: '100%',
                            overflow: "scroll",
                            overflowX: "hidden",
                        }}
                    >
                        <Box sx={{ m: 1, mr: 2 }}>
                            {messages.map((message, index) => (
                                <Message
                                    key={index}
                                    content={message.content}
                                    image={message.image}
                                    isCustomer={message.isCustomer}
                                    choices={message.choices}
                                    handleChoice={sendMessage}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            mt: 2,
                            display: "flex",
                            flexFlow: "row",
                            gap: 1,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            value={messageInput}
                            onChange={(event) => setMessageInput(event.target.value)}
                            fullWidth
                        />
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                        >
                            <SendIcon />
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Box>


    );

}
>>>>>>> Stashed changes
