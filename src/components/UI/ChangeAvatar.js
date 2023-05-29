import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../utils/storage';
import useApi from '../../hooks/useApi';
import { login } from '../../store/auth';
import { ProfileURL } from '../utils/constants';

export default function ChangeAvatar() {

    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = load('AuthToken')

    const { put } = useApi(ProfileURL, token);
    //console.log("Parameters:", ProfileURL + user.user, token);

    const handleChange = (user, value) => {
        setFormData({...formData, [user]: value})
        }

    const handleChangeAvatar = async (e, body) => {
        e.preventDefault();

        try {
            const response = await put(user.user, body, '/media');
            dispatch(
                login({
                ...user,
                avatar: response?.avatar
                })
            );
        } catch (error) {
            setErrors()
            console.log(error);
        } finally {
            console.log('Success');
        }
        };

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Avatar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please note that the avatar must be fully formed URL that links to a live and publicly accessible image.
          </DialogContentText>
          <TextField
                margin="normal"
                required
                fullWidth
                name="avatar"
                label="Avatar"
                type="avatar"
                id="avatar"
                autoComplete="avatar"
                error={errors.some(error => error.path.includes('avatar'))}
                helperText={errors
                  .filter(error => error.path.includes('avatar'))
                  .map(error => error.message)
                  .join(', ')}
                onChange={(event) => handleChange('avatar', event.target.value)}
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleChangeAvatar(e, formData)}>Change Avatar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}