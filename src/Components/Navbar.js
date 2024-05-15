import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#C9E5EF', }}>
            <Toolbar sx={{ justifyContent: 'space-between', mx: '90px', }}>
                <Typography
                    variant="h4"
                    sx={{ fontFamily: 'Calistoga', color: 'white' }}
                >
                    Edusys
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button sx={{
                        fontFamily: 'Calistoga', backgroundColor: "#C9E5EF",
                        "&:hover": {
                            backgroundColor: "#FFD500",
                        },
                        width: '100%'
                    }}
                    >
                         <a href="#home-section" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Home
                        </a>
                    </Button>
                    <Button sx={{
                        fontFamily: 'Calistoga', backgroundColor: "#C9E5EF",
                        "&:hover": {
                            backgroundColor: "#FFD500",
                        },
                        width: '100%'
                    }}>
                         <a href="#about-section" style={{ textDecoration: 'none', color: 'inherit' }}>
                            About
                        </a>
                    </Button>
                    <Button sx={{
                        fontFamily: 'Calistoga', backgroundColor: "#C9E5EF",
                        "&:hover": {
                            backgroundColor: "#FFD500",
                        },
                        width: '100%'
                    }}>
                         <a href="#contact-section" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Contact
                        </a>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;