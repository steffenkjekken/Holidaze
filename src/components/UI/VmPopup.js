import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tos from './Tos';
import { Box, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { load } from '../utils/storage';
import { ProfileURL } from '../utils/constants';
import useApi from '../../hooks/useApi';
import { login } from '../../store/auth';
import { useDispatch } from 'react-redux';


function VmPopup() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = load('AuthToken')

    const request = {
        "venueManager": true
      }
    const { put } = useApi(ProfileURL, token);
    console.log("Parameters:", ProfileURL + user.user, token);

    const handleVenueManager = async (e, body) => {
        e.preventDefault();
    
        try {
            const response = await put(user.user, body);
            console.log('Venue Manager successful!');
            dispatch(
              login({
                user: response?.name,
                email: response?.email,
                avatar: response?.avatar,
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
          <DialogContentText id="alert-dialog-description">
          We invite you to join our community and embark on a fulfilling journey as a Venue Manager with Holidaze.
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
          <FormControl sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          }}>
           <Typography variant='subtitle2'sx={{mr:2}}>I have read and agree to the terms and conditions</Typography>
           <FormControlLabel required control={<Checkbox />} size="small"/>
           </FormControl>
        </DialogContent>
        <DialogActions sx={{
            display:'flex',
            flexDirection:'column',
            gap:1
        }}>
          <Button sx={{width:'80%'}} onClick={(e) => handleVenueManager(e, request)}>Make me a Venue Manager</Button>
          <Button sx={{width:'80%'}}>
            No thanks, take me back
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default VmPopup
