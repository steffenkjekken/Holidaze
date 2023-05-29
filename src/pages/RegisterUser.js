import React from 'react'
import Beach from "../assets/images/Beach.jpg"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { Grid, CssBaseline, Link, Button, Typography, Avatar, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { RegisterURL } from '../components/utils/constants'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[A-Za-z0-9._%+-]+@stud.noroff\.no$/, 'Email must be valid stud.noroff mail')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  avatar: Yup.string()
});


const RegisterUser = () => {
    const [formData, setFormData] = useState({})
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [successContent, setSuccessContent] = useState('');


    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });

    const handleChange = (user, value) => {
    setFormData({...formData, [user]: value})
    }
  
  const onSubmit = (e) => {
      const data = new FormData(e.currentTarget);
      let requestBody = {
          ...formData
      }
      axios.post(RegisterURL, requestBody)
      .then(res => {
        if(res.request.statusText === "Created")
        {
          setSuccessContent("Succesfully registered");
          setSuccess(true);
        }
      else
        {
          setSuccess(false);
        }
        console.log('post res', res.request.statusText);
      })
      .catch(error => {
        console.log('Error response:', error.response.data.errors[0].message);
        setAlertContent(error.response.data.errors[0].message);
        setAlert(true);
      });

      console.log({
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        avatar: data.get('avatar'),
      }); 
  };

  return (
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
                {...register('name')}
                error={errors.name ? true : false}
                onChange={(event) => handleChange('name', event.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email')}
                error={errors.email ? true : false}
                onChange={(event) => handleChange('email', event.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={errors.password ? true : false}
                onChange={(event) => handleChange('password', event.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                name="avatar"
                label="Avatar"
                type="avatar"
                id="avatar"
                autoComplete="avatar"
                {...register('avatar')}
                error={errors.avatar ? true : false}avatar
                onChange={(event) => handleChange('avatar', event.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.avatar?.message}
              </Typography>
              {success ? <Link to="/login" component={RouterLink} variant="body2">
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Go to login page
              </Button>
                  </Link> : <Button
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>}
              {success ? <Alert severity='success'>{successContent}</Alert> : <></>}
              {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
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
  )
}

export default RegisterUser