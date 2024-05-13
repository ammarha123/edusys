import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import cover from '../assets/34371991_v228-wit-02a-job58.jpg'

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  margin-right: 20px;
`;
const noteList = [
    {

        img: cover,
        title: "Visual Learner Planner",
        date: "24 April 2021",
    },
    {
        img: cover,
        title: "Visual Learner Planner",
        date: "24 April 2021",
    },
    {

        img: cover,
        title: "Plant Lesson Plan",
        date: "24 April 2021",
    },
    {

        img: cover,
        title: "Science Y4 Lesson Plan",
        date: "24 April 2021",
    },
];

export default function Dashboard() {
    return (
        <>
            <Box
                id="hero"
                sx={{

                    backgroundColor: '#53A2BE',
                    backgroundSize: 'cover',
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
                    <Avatar alt="Profile Picture" src="/path/to/profile-picture.jpg" />
                    <Typography variant="h5"
                        sx={{
                            fontFamily: 'Calistoga',
                            color: 'white',
                            marginLeft: '16px'
                        }}>
                        siti khadijah
                    </Typography>

                </Box>
            </Box>
            <Box
                sx={{
                    backgroundColor: '#53A2BE',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100vh',
                    paddingTop: '40px'
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
                        Make the Learning Fun with Edusys
                    </Typography>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        p: 2,
                        mx: '90px'
                    }}>
                    <Link to="/Login" style={{ textDecoration: 'none' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            endIcon={<AddCircleIcon sx={{ fontSize: 'large' }} />}
                            sx={{
                                mt: 2,
                                mb: 2,
                                height: "63px",
                                width: "243px",
                                backgroundColor: "#FFD500",
                                "&:hover": {
                                    backgroundColor: "#FFD500",
                                },
                                fontFamily: 'Calistoga',
                                borderRadius: '30px',
                                fontSize:'25px'
                            }}
                        >
                            New Chat
                        </Button>
                    </Link>
                </Box>
                <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: '#216C94',
                        padding: 2,
                        borderRadius: '10px',
                        mx: '90px'
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ color: '#fff', fontFamily: 'Calistoga', mx: '60px' }}>
                        Note List
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        p: 2,
                        mx: '90px',
                        backgroundColor: '#176087',
                        borderRadius: '10px'
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
                            <StyledCard key={index}>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: 'auto',
                                    }}>
                                        <img src={note.img} alt={note.title} style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
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
            </Box>
        </>
    );
}
