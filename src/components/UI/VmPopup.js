import React from 'react'
import { Box, 
         FormControl, 
         FormControlLabel,
         Checkbox, 
         Typography, 
         Link, 
         Button, 
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogContentText, 
         DialogTitle } from '@mui/material';
import Tos from './Tos';
import { useSelector, useDispatch } from 'react-redux';
import { load } from '../utils/storage';
import { ProfileURL } from '../utils/constants';
import useApi from '../../hooks/useApi';
import { login } from '../../store/auth';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

function VmPopup() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = load('AuthToken')
    const [errorMessage, setErrorMessage] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const request = {
        "venueManager": true
      }
    const { put } = useApi(ProfileURL, token);
    //console.log("Parameters:", ProfileURL + user.user, token);

    const handleCheckboxChange = (e) => {
      setCheckboxChecked(e.target.checked);
    };

    const handleVenueManager = async (e, body) => {
        e.preventDefault();
        if (!checkboxChecked) {
          setErrorMessage('Please agree to the terms and conditions');
          return;
        }
    
        try {
            const response = await put(user.user, body);
            console.log('Venue Manager successful!');
            dispatch(
              login({
                ...user,
                venueManager: response?.venueManager,
              })
            );
        } catch (error) {
          console.log(error);
        } finally {
          console.log('Success');
        }
      };

  return (
      <Dialog
        open
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"It looks like you are not signed up to be a Venue Manager yet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Becoming a Venue Manager at Holidaze opens doors to new opportunities, financial rewards, and a chance to share your remarkable venue with the world. 
          </DialogContentText>
          <Box
            component="div"
            sx={{
              overflow: 'auto',
              my: 2,
              p: 1,
              height:'150px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
              color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              borderRadius: 2,
            }}
          >
            <Tos/>
          </Box>
          <FormControl 
          sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          }}>
            <Typography variant='subtitle2'sx={{mr:2}}>I have read and agree to the terms and conditions</Typography>
            <FormControlLabel
              required
              control={<Checkbox checked={checkboxChecked} onChange={handleCheckboxChange} />}
              size="small"
            />
           </FormControl>
           {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
            )}
        </DialogContent>
        <DialogActions sx={{
            display:'flex',
            flexDirection:'column',
            gap:1
        }}>
          <Button sx={{width:'80%'}} onClick={(e) => handleVenueManager(e, request)}>Make me a Venue Manager</Button>
          <Link component={RouterLink} to="/" underline='none' variant="subtitle1">
            <Button sx={{width:'80%'}}>
              No thanks, take me back
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
  );
}
export default VmPopup
