import * as React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { styled } from '@mui/system';

const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function Login() {
    const [userName, setUserName] = React.useState('');
    const handleUsername = (event) => {
     
    };

    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: '200px'
            }}
        >
            <Grid
                item
                xs={12} sm={2} md={4}
                elevation={4}
                sx={{
                    height: '479px',
                    width: '479px',
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
                    <Typography component="h1" variant="h5" padding='20px' margin='10px'>
                        Welcome Back!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',

                        }}
                    >
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel htmlFor="username" >
                                Username
                            </FormLabel>
                            <OutlinedInput
                                id="username"
                                autoComplete="username"
                                placeholder=""
                                required
                                value={userName}
                                onChange={handleUsername}
                                sx={{ backgroundColor: 'white', width: '100%' }}
                            />
                        </FormGrid>

                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', padding: '10px' }}>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel htmlFor="password" >
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
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
                        <FormControlLabel
                            control={<Checkbox name="saveInfo" />}
                            label="Remember me"
                        />
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
                        Login
                    </Button>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Dont have an account?
                            <Link href="#" variant="body2">
                                {" Register here"}
                            </Link>
                        </Typography>
                    </Grid>

                </Box>
            </Grid>
        </Grid>
    );
}

