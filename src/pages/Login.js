import React from 'react'
import { Grid,CssBaseline, Link, Checkbox, Button, Typography, Avatar, FormControlLabel, Box, TextField, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Beach from "../assets/images/Beach.jpg"
import { Link as RouterLink } from 'react-router-dom';
import { LoginURL } from '../components/utils/constants';
import axios from 'axios';
import { useState } from 'react';
import { save } from '../components/utils/storage';
import { updateLoginVisibility } from '../components/utils/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth';


const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({})
  const [success, setSuccess ] = useState(false)
  const [errors, setErrors] = useState([]);

  const handleChange = (user, value) => {
    setFormData({...formData, [user]: value})
}
  
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  let requestBody = {
    ...formData
  };

  axios.post(LoginURL, requestBody)
    .then((response) => {
      save('AuthToken', response?.data?.accessToken);
      dispatch(login({
        user:  response?.data?.name,
        email:  response?.data?.email,
        avatar:  response?.data?.avatar,
        venueManager:  response?.data?.venueManager
      }));
      updateLoginVisibility();
      setSuccess(true);
      console.log(data);
    })
    .catch((error) => {
      console.log('Error response:', error.response);
      if (error.response && error.response.data && error.response.data.errors) {
        const receivedErrors = error.response.data.errors;
        if (Array.isArray(receivedErrors)) {
          setErrors(receivedErrors);
        } else {
          setErrors([{ message: 'An error occurred. Please try again later.' }]);
        }
      } else {
        setErrors([{ message: 'An error occurred. Please try again later.' }]);
      }
    });
};

  return (
    <>
       {success ? (
        <Box sx={{
          mt:2
        }}>
          <Paper elevation={3} sx={{
            width: {xs: "90%", md:"60%"},
            margin: "auto",
            textAlign: "center",
            py:2
          }}>
              <Typography variant='h4'>You are logged in!</Typography>
              <CheckCircleIcon fontSize='large' color='success'/>
              <br />
              <Link component={RouterLink} to="/" underline='none' variant="subtitle1">
                  Go to Home
              </Link>
          </Paper>
        </Box>
        ) : (
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${Beach})`,
              //backgroundImage: 'url(https://pixabay.com/get/gd72f426ac6fe20168c801f69967ad0a9a95f3c8ec11dc5fb370c4e65f5c46d94c90eafb9bde3cb0d7d82b22389f91d8187989d4a83843c45fb4183a8c55fffe91a449fa579aae7869d2e1954651a2d7c_1920.jpg)',
              //backgroundImage: 'url(https://pixabay.com/get/gfd66c47f3b4d0ac1f095a78452c05264b8502e0b08780b9b7698335cb8bd31b06d5aca043b6cadeaf7814c2ce9abffc263cf08482c066496127022b0abfc8481d4778c6ba0b0483b0c130761f294948a_1920.jpg)',
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={errors.some(error => error.path && error.path.includes('email'))}
                  helperText={errors
                    .filter(error => error.path && error.path.includes('email'))
                    .map(error => error.message)
                    .join(', ')}
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
                  error={errors.some(error => error.path && error.path.includes('password'))}
                  helperText={errors
                    .filter(error => error.path && error.path.includes('password'))
                    .map(error => error.message)
                    .join(', ')}
                  onChange={(event) => handleChange('password', event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {errors.length > 0 && (
                  <Typography color="error" align="center">
                    {errors[0].message}
                  </Typography>
                )}
                <Grid container>
                  <Grid item>
                    <Link component={RouterLink} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        )}
      </>
  )
}

export default Login