import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, Avatar, } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { BookingsByProfile } from '../components/utils/constants';
import { options } from '../components/utils/constants';
import axios from 'axios';
//import { Link as RouterLink } from 'react-router-dom';


const theme = createTheme();

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    const { data, isLoading, isError } = axios.get(BookingsByProfile, options);
    
    if (isLoading) {
      return <span className="visually-hidden">Loading...</span>;
    }
  
    if (isError) {
      return <div>Error</div>;
    }

  console.log(data);
    
  
    return (
        <>
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ 
            height: 'auto',
            mt: 3
            }}>
            <Box
                sx={{
                my: 8,
                mx: 4,
                width: "65%",
                border:"0.5px solid black",
                borderRadius:"5px",
                margin: "0 auto",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar src={user.avatar} sx={{
                    m: 1,
                    bgcolor: 'secondary.main',
                    width: 80,
                    height: 80 
                }}/>
                <Typography component="h1" variant="h5">
                {user.user}
                </Typography>
                <Box>
                    <Typography>
                        lorem ips
                    </Typography>
                </Box>
            </Box>
        </Grid>
        </ThemeProvider>
        </>
    )
}

export default Profile