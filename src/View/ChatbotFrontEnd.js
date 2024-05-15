import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Components/Message";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function ChatbotFrontEnd() {
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
        {["New Chat", "Editor"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <AddCircleIcon /> : <EditNoteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ fontFamily: "Calistoga" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ my: 2, mx: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: "Calistoga" }}>
          Chat History
        </Typography>
        {["History1", "History2", "History3"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemText primary={text} sx={{ fontFamily: "Calistoga" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const messagesListRef = React.createRef();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      content: "Hello. How can I help you today?",
      isCustomer: false,
    },
  ]);

  const sendMessage = (content) => {
    // add the message to the state
    setMessages([
      ...messages,
      {
        content: content,
        isCustomer: true,
      },
      {
        content: answer,
        isCustomer: false,
      },
    ]);

    // TODO: post the request to Back4app
  };

  // const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    sendMessage(messageInput);
    setMessageInput("");

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
      method: "post",
      data: { contents: [{ parts: [{ text: messageInput }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  };

  return (
    <Box Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      ></AppBar>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#53A2BE",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box>
          <Box
            ref={messagesListRef}
            sx={{
              height: "100%",
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
            <Button onClick={handleSubmit} type="submit">
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
