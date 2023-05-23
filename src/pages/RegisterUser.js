import React from 'react'
import Beach from "../assets/images/Beach.jpg"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { Grid, CssBaseline, Link, Button, Typography, Avatar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { RegisterURL } from '../components/utils/constants'
import axios from 'axios'

const theme = createTheme();


const RegisterUser = () => {
    const [formData, setFormData] = useState({})

    const handleChange = (user, value) => {
    setFormData({...formData, [user]: value})
    }
  
  const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      let requestBody = {
          ...formData
      }
    axios.post(RegisterURL, requestBody).then(res => console.log('post res', res))
    .catch(error => {
        console.error('There was an error in post request!', error);
    });
      console.log({
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        avatar: data.get('avatar'),
      }); 
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Beach})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AppRegistrationRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="name"
                id="name"
                autoComplete="name"
                onChange={(event) => handleChange('name', event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => handleChange('email', event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => handleChange('password', event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="avatar"
                label="Avatar"
                type="avatar"
                id="avatar"
                autoComplete="avatar"
                onChange={(event) => handleChange('avatar', event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" component={RouterLink} variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </ThemeProvider>
  )
}

export default RegisterUser