import React from 'react';
import Navbar from '../Components/Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { Box } from '@mui/material';

export default function LandingPage() {
    return (
        <>
        <Navbar/>
             <Box id="home-section">
                <Home />
            </Box>
            <Box id="about-section">
                <About />
            </Box>
            <Box id="contact-section">
                <Contact />
            </Box>
        </>

    );
}