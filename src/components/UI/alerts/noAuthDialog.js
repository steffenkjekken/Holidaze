import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NoAuthDialog() {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate authentication check delay
        const timer = setTimeout(() => {
          setIsLoading(false); // Set loading state to false
        }, 500);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

      if (isLoading) {
        return <div>Loading...</div>; // Display loading state instead of showing the profile page content
      }

    const navigateToLogin = () => {
        // 👇️ navigate to /contacts
        navigate('/login');
        setOpen(false);
    };

    const navigateToHome = () => {
        // 👇️ navigate to /
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
            <Button onClick={navigateToLogin} autoFocus>
            Login
            </Button>
            </DialogActions>
            </Dialog>
            )}
        </div>
    );
    }