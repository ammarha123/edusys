import React, { useState, useEffect, useContext } from "react";
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
import { Link } from "react-router-dom";
import axios from "axios";
import { db } from "../Components/firebase-config.js";
import {
  getDocs,
  addDoc,
  setDoc,
  collection,
  where,
  query,
  doc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { ChatContext } from "./ChatContext.js";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/authContext.js";

const chatDB = collection(db, "ChatID");

const cookies = new Cookies();

export default function ChatbotFrontEnd() {
  const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token"));

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

  const [chats, setChatHistory] = React.useState([]);
  const { dispatch } = React.useContext(ChatContext);
  const [idl, setidl] = React.useState();

  useEffect(() => {
    const getChatHistory = () => {
      // const unsub = onSnapshot(doc(db, "History", isAuth), (doc) => {
      //   setChatHistory(doc.data());
      //   // console.log(doc.data());
      // });

      const a = query(
        collection(db, "NewChatwithId"),
        where("Username", "==", isAuth)
      );

      const unsubscribe = onSnapshot(a, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });
        // console.log("Current cities in CA: ", cities.join(", "));
        console.log(cities);
        setChatHistory(cities);
      });

      return () => {
        unsubscribe();
      };
    };

    isAuth && getChatHistory();
  }, [isAuth]);

  const [input, setInput] = useState([]);

  const [choice1, setChoice1] = useState([
    "Visual",
    "Verbal",
    "Active",
    "Reflective",
    "Intuitive",
    "Sensitive",
    "Sequential",
    "Global",
  ]);

  const [choice2, setChoice2] = useState([
    "Lesson Plan",
    "Exercise",
    "Teaching Strategies",
    "Environment",
  ]);

  const handleSelect = (u) => {
    // setChoice2(["LO", "Exercise", "Teaching Strategies", "Environment"]);

    dispatch({ type: "CHANGE_USER", payload: u });
    setidl(u);

    const unSub = onSnapshot(doc(db, "Chats", u), (doc) => {
      doc.exists() && setInput(doc.data().messages);

      // const mylist = input.map((item, index) => {
      //   <li key={index}>
      //     if (item.senderId === 1)
      //     {setMessages([
      //       ...messages,
      //       {
      //         content: item.text,
      //         isCustomer: false,
      //       },
      //     ])}
      //     {setMessages([
      //       ...messages,
      //       {
      //         content: item.text,
      //         isCustomer: true,
      //       },
      //     ])}
      //   </li>;
      //   // if (item.senderId === 1) {
      //   //   setMessages([
      //   //     ...messages,
      //   //     {
      //   //       content: item.text,
      //   //       isCustomer: false,
      //   //     },
      //   //   ]);
      //   // } else {
      //   //   setMessages([
      //   //     ...messages,
      //   //     {
      //   //       content: item.text,
      //   //       isCustomer: true,
      //   //     },
      //   //   ]);
      //   // }
      // });
    });

    return () => {
      unSub();
    };
  };

  console.log(input);

  const History = [
    {
      title: "Visual Learner Planner",
      date: "29 April 2023",
    },
    {
      title: "Visual Learner Planner",
      date: "26 April 2023",
    },
    {
      title: "Plant Lesson Plan",
      date: "4 April 2023",
    },
    {
      title: "Science Y4 Lesson Plan",
      date: "3 April 2023",
    },
  ];

  const newChat = async (e) => {
    const mess =
      "Hello. Welcome to EduSys. Please choose an learning styles option below?";
    const ChatId = await addDoc(collection(db, "History"), {
      Username: isAuth,
      Date: serverTimestamp(),
      LastMessage: mess,
    });

    // setidl(ChatId.id);

    await setDoc(doc(db, "NewChatwithId", ChatId.id), {
      Username: isAuth,
      Date: serverTimestamp(),
      LastMessage: mess,
      Id: ChatId.id,
    });

    await setDoc(doc(db, "Chats", ChatId.id), {
      // messages: []
      messages: arrayUnion({
        id: uuid(),
        text: mess,
        senderId: 1,
        date: Timestamp.now(),
      }),
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: 1,
        }}
      >
        <Link to="/Chats" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<AddCircleIcon sx={{ fontSize: "large" }} />}
            sx={{
              mt: 2,
              mb: 2,
              width: "200px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "18px",
            }}
            onClick={newChat}
          >
            New Chat
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 1,
        }}
      >
        <Link to="/Editor" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<EditNoteIcon sx={{ fontSize: "large" }} />}
            sx={{
              mt: 2,
              mb: 2,
              width: "200px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "18px",
            }}
          >
            Editor
          </Button>
        </Link>
      </Box>
      <Divider />
      <List>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Calistoga", mb: 1, my: 1, mx: 2 }}
        >
          Chat History
        </Typography>
        {chats.map((item, index) => (
          <ListItem key={index} sx={{ py: 0 }}>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  handleSelect(item.Id);
                  // setidl(item.Id);
                }}
                primary={
                  <Typography component="h8" sx={{ fontFamily: "Calistoga" }}>
                    {/* {item.Date} */}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ fontFamily: "Calistoga" }}>
                    {item.Username}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* {Array(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].Username)}
            >
              <div className="userChatInfo">
                <span>{chat[0]}</span>
                <p>{chat[1].LastMessage?.text}</p>
              </div>
            </div>
          ))} */}

        {/* {History.map((item, index) => (
          <ListItem key={index} sx={{ py: 0 }}>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography component="h8" sx={{ fontFamily: "Calistoga" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ fontFamily: "Calistoga" }}>
                    {item.date}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  const messagesListRef = React.createRef();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      content:
        "Hello. Welcome to EduSys. Please choose an learning styles option below?",
      isCustomer: false,
      choices: [
        "Visual",
        "Verbal",
        "Active",
        "Reflective",
        "Intuitive",
        "Sensitive",
        "Sequential",
        "Global",
      ],
    },
    {
      content: "Visual",
      isCustomer: true,
    },
    {
      content:
        "Visual learning is one of the three primary learning styles, along with auditory and kinesthetic learning. People who are visual learners often find it easier to understand and remember information when it is presented to them visually, rather than through verbal or written means. Here are key aspects of visual learning styles, along with some strategies that visual learners can use to enhance their educational experience:",
      isCustomer: false,
    },
    {
      content: "Choose an action",
      isCustomer: false,
      choices: ["LO", "Exercise", "Teaching Strategies", "Environment"],
    },
  ]);
  const [answer, setAnswer] = useState("");

  const sendMessage = (content) => {
    // add the message to the state
    // setMessages([
    //   ...messages,
    //   {
    //     content: content,
    //     isCustomer: true,
    //   },
    //   {
    //     content: answer,
    //     isCustomer: false,
    //   },
    // ]);
    setMessageInput(content);
    setNewMessage(content);

    // TODO: post the request to Back4app
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   sendMessage(messageInput);
  //   setMessageInput("");
  // };

  const { currentUser } = useContext(AuthContext);
  const { data1 } = useContext(ChatContext);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    sendMessage(messageInput);
    setMessageInput("");

    if (choice1.includes(messageInput)) {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
        method: "post",
        data: {
          contents: [{ parts: [{ text: messageInput + " learning style" }] }],
        },
      });

      const ans =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: messageInput,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: ans,
          senderId: 1,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "NewChatwithId", idl), {
        LastMessage: ans,
      });

      setMessages([
        ...messages,
        {
          content: messageInput,
          isCustomer: true,
        },
        {
          content:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          isCustomer: false,
        },
      ]);

      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      console.log(answer);
      // return;
    } else {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
        method: "post",
        data: { contents: [{ parts: [{ text: messageInput }] }] },
      });

      const ans =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: messageInput,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: ans,
          senderId: 1,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "NewChatwithId", idl), {
        LastMessage: ans,
      });

      setMessages([
        ...messages,
        {
          content: messageInput,
          isCustomer: true,
        },
        {
          content:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          isCustomer: false,
        },
      ]);

      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      console.log(answer);
      // return;
    }
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
              flex: 1,
              height: "80vh",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ m: 1, mr: 2 }}>
              {/* {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.content}
                  image={message.image}
                  isCustomer={message.isCustomer}
                  choices={message.choices}
                  handleChoice={sendMessage}
                />
              ))} */}

              {input.map((item, index) => (
                <Message
                  key={index}
                  content={item.text}
                  // image={message.image}
                  isCustomer={item.senderId === 1 ? false : true}
                  choices={
                    item.text ===
                    "Hello. Welcome to EduSys. Please choose an learning styles option below?"
                      ? choice1
                      : choice2
                  }
                  handleChoice={sendMessage}
                />
                // <ListItem key={index} sx={{ py: 0 }}>
                //   <ListItemButton>
                //     <ListItemText
                //       primary={
                //         <Typography
                //           variant="body2"
                //           sx={{ fontFamily: "Calistoga" }}
                //         >
                //           {item.text}
                //         </Typography>
                //       }
                //     />
                //   </ListItemButton>
                // </ListItem>
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
              inputProps={{ readOnly: true }}
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
