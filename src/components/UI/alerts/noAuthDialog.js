import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NoAuthDialog() {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false); 
        }, 500);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

      if (isLoading) {
        return <div>Loading...</div>;
      }

    const navigateToLogin = () => {
        navigate('/login');
        setOpen(false);
    };

    const navigateToHome = () => {
        navigate('/');
        setOpen(false);
    };

    return (
        <div>
            { isLoading ? (
                <div>LOADING</div>
            ) : (
            <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">   
              <DialogTitle id="alert-dialog-title">
              Something went wrong
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    It looks like you are not properly authenticated, please log in again or return to home
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={navigateToHome}>Home</Button>
                <Button onClick={navigateToLogin} autoFocus>Login</Button>
              </DialogActions>
            </Dialog>
            )}
        </div>
    );
    }