import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import backgroundImage from "/Users/fadhlina/personalised-chatbot/src/Components/chatbot-background.jpg"
import { styled } from '@mui/system';

const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function Register() {
    const [userName, setUserName] = React.useState('');
    const [fullName, setfullName] = React.useState('');
    const handleUsername = (event) => {};

    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: '200px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Grid
                item
                xs={12} sm={2} md={4}
                elevation={4}
                sx={{
                    height: '738px',
                    width: '489px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#53A2BE', // Set the background color
                    borderRadius: 3,
                }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 1,
                    }}
                >
                    <Typography component="h1" variant="h5"  margin='5px' mb='30px'>
                       Please Fill Out Form to Register!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',

                        }}
                    >
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel >
                                Full Name
                            </FormLabel>
                            <OutlinedInput
                                id="fullName"
                                autoComplete="fulllName"
                                placeholder=""
                                required
                                value={fullName}
                                onChange={handleUsername}
                                sx={{ backgroundColor: 'white', width: '100%' }}
                            />
                        </FormGrid>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', padding: '10px' }}>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel  >
                                Username
                            </FormLabel>
                            <OutlinedInput
                                id="username"
                                autoComplete="username"
                                placeholder=""
                                required
                                sx={{ backgroundColor: 'white', width: '100%' }}
                            />
                        </FormGrid>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', padding: '10px' }}>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel  >
                               Email
                            </FormLabel>
                            <OutlinedInput
                                id="Email"
                                autoComplete="Email"
                                placeholder=""
                                required
                                sx={{ backgroundColor: 'white', width: '100%' }}
                            />
                        </FormGrid>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', padding: '10px' }}>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel >
                                Password
                            </FormLabel>
                            <OutlinedInput
                                id="password"
                                autoComplete="password"
                                placeholder=""
                                required
                                sx={{ backgroundColor: 'white', width: '100%' }}
                            />
                        </FormGrid>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', padding: '10px' }}>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel >
                                Confirm Password
                            </FormLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                autoComplete="confirmPassword"
                                placeholder=""
                                required
                                sx={{ backgroundColor: 'white', width: '100%' }}
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
                            height: '63px',
                            width: '243px',
                            backgroundColor: '#176087',
                            '&:hover': {
                                backgroundColor: '#14506E'
                            }
                        }}
                    >
                        Register
                    </Button>
                    <Grid item>
                        <Typography>
                            I have an account
                            <Link to="/"> Login</Link>
                        </Typography>
                    </Grid>

                </Box>
            </Grid>
        </Grid>
    );
}