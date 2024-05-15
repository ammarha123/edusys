
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
import { Link } from "react-router-dom";

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
    
   

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    mx: 1
                }}>
                <Link to="/Chatbot" style={{ textDecoration: 'none' }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        startIcon={<AddCircleIcon sx={{ fontSize: 'large' }} />}
                        sx={{
                            mt: 2,
                            mb: 2,
                            width: '200px',
                            backgroundColor: "#FFD500",
                            "&:hover": {
                                backgroundColor: "#FFD500",
                            },
                            fontFamily: 'Calistoga',
                            borderRadius: '30px',
                            fontSize: '18px'
                        }}
                    >
                        New Chat
                    </Button>
                </Link>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    mx: 1
                }}>
                <Link to="/Editor" style={{ textDecoration: 'none' }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        startIcon={<EditNoteIcon sx={{ fontSize: 'large' }} />}
                        sx={{
                            mt: 2,
                            mb: 2,
                             width: '200px',
                            backgroundColor: "#FFD500",
                            "&:hover": {
                                backgroundColor: "#FFD500",
                            },
                            fontFamily: 'Calistoga',
                            borderRadius: '30px',
                            fontSize: '18px'
                        }}
                    >
                        Editor
                    </Button>
                </Link>
            </Box>
            <Divider />
            <List >
                <Typography variant="h6" sx={{ fontFamily: 'Calistoga', mb: 1, my: 1, mx: 2 }}>Chat History</Typography>
                {History.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0, }}>
                        <ListItemButton>
                            <ListItemText
                                primary={
                                    <Typography component="h8" sx={{ fontFamily: 'Calistoga' }}>
                                        {item.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" sx={{ fontFamily: 'Calistoga' }}>
                                        {item.date}
                                    </Typography>
                                }
                            />
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
            content: "Hello. Welcome to EduSys. Please choose an learning styles option below?",
            isCustomer: false,
            choices: ["Visual", "Verbal", "Active", "Reflective", "Intuitive", "Sensitive", "Sequential", "Global"]
        },
        {
            content: "Visual",
            isCustomer: true
        },
        {
            content: "Visual learning is one of the three primary learning styles, along with auditory and kinesthetic learning. People who are visual learners often find it easier to understand and remember information when it is presented to them visually, rather than through verbal or written means. Here are key aspects of visual learning styles, along with some strategies that visual learners can use to enhance their educational experience:",
            isCustomer: false,
        },
        {
            content: "Choose an action",
            isCustomer: false,
            choices: ["LO", "Exercise", "Teaching Strategies", "Environment"]
        }
    ]);


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

        <Box Box sx={{ display: 'flex' }}>
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
                            flex: 1,
                            height: '80vh', 
                            justifyContent: 'space-between'
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
