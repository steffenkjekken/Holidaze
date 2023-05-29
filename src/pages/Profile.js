import React from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, Avatar, } from '@mui/material'
import { useSelector } from 'react-redux';
import ProfileBookings from '../components/UI/ProfileBookings';
import ProfileVenues from '../components/UI/ProfileVenues';
import ChangeAvatar from '../components/UI/ChangeAvatar';


const Profile = () => {
    const user = useSelector((state) => state.auth.user);
  
    return (
    <>
        <Grid container component="main" sx={{ 
            height: 'auto',
            mt: 3,
            maxWidth:'905px',
            mx:'auto'
            }}>
            <Box
                sx={{
                my: 8,
                mx: 4,
                width: "65%",
                margin: "0 auto",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pb:1
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
                <ChangeAvatar/>
            </Box>
        </Grid>
        <Grid container sx={{ 
            height: 'auto',
            mt: 3,
            maxWidth:'905px',
            mx:'auto'
            }}>
            <ProfileVenues/>
            <ProfileBookings/>
        </Grid>
    </>
    )
}

export default Profile