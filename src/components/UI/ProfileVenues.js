import React from 'react'
import { VenuesByProfile } from '../utils/constants';
import useApi from '../../hooks/useApi';
import { load } from '../utils/storage';
import { Box, 
         Grid, 
         ImageList, 
         Typography, 
         Button, 
         ButtonGroup, 
         ImageListItem, 
         Link, 
         ImageListItemBar,
         DialogTitle,
         Dialog,
         DialogContent,
         ListItem,
         ListItemText,
         List,
        CircularProgress  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Image from 'mui-image';
import { useEffect } from 'react';
import { URL } from '../utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import format from 'date-fns/format';

const ProfileVenues = () => {

    const token = load('AuthToken')
    const navigate = useNavigate()

    const { data, isLoading, isError, get, refresh } = useApi(VenuesByProfile, token);
    const { del } = useApi(URL, token);

    const [open, setOpen] = React.useState(false);
    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        get();
        // eslint-disable-next-line
      }, []);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
      setOpen(false);
    };
  
    const fetchBookings = async (venueId) => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?&_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
          const bookingsResponse = await response.json();
          const fetchedBookingsData = bookingsResponse.bookings;
          setBookingsData(fetchedBookingsData);
          handleClickOpen();
      } catch (error) {
        console.log(error);
      }
    };


    const handleDeleteVenue = async (e, venueId) => {
      e.preventDefault();

      try {
        await del(venueId);
        console.log('Deletion successful!');
        refresh();
      } catch (error) {
        console.log(error);
        
      } finally {
        console.log("Delete success");
      }
    };

    const renderData =  data && data.map((data) => {
      const mediaArray = data.media.toString().split(', ');
      let commaSepMedia;
      if (mediaArray.length > 1) {
      commaSepMedia = mediaArray.map(item => item).join(', ');
      } else {
      commaSepMedia = mediaArray[0];
      }

      const venueData = {
          id: data.id,
          name: data.name,
          description: data.description,
          media: [commaSepMedia],
          price: parseInt(data.price),
          maxGuests: parseInt(data.maxGuests),
          rating: parseInt(data.rating),
          meta: {
            wifi: data.meta.wifi,
            parking: data.meta.parking,
            breakfast: data.meta.breakfast,
            pets: data.meta.pets,
          },
          location: {
            address: data.address,
            city: data.city,
            zip: data.zip,
            country: data.country,
            continent: data.continent,
            lat: parseFloat(data.lat || 0),
            lng: parseFloat(data.lng || 0),
          },
        };

        if (isLoading) {
          return (
          <Box key={data.id} sx={{
            width:"350px",
            margin:"auto",
            textAlign:"center"
          }}>
          < CircularProgress color="secondary" />
        </Box>
          )
        }
      
        if (isError) {
          return <div key={data.id}>Something went wrong</div>;
        }
      
        if (!data) {
          return (
            <Box key={data.id} sx={{
              width:"350px",
              margin:"auto",
              textAlign:"center"
            }}>
            < CircularProgress color="secondary" />
          </Box>
          )
        }

    return (
      <Box key={data.id} sx={{
          width:"min-content"
      }}>
        <ImageListItem sx={{
            width:{ xs:"100%", md:"400px"},
        }}>
          <Link component={RouterLink} to={`/venues/${data.id}`}>
            <Image
              src={`${data.media[0]}`}
              srcSet={`${data.media[0]}`}
              alt={data.title}
              variant="rounded"
              loading="lazy"
              duration={1000}
              sx={{
                  borderRadius:"5px 5px 0 0",
                  aspectRatio: {xs:"24/18",md:"20/10"},
              }}
            />
            <ImageListItemBar
              title={data.name}
              position="bottom"
            />
          </Link>
        </ImageListItem>
        <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth sx={{
            height: "45px"
        }}>
          <Button startIcon={<EventSeatIcon />} 
              onClick={() => {
                  fetchBookings(data.id);
              }}
              sx={{
                  borderRadius: "0 0 5px 5px",
                  borderTop: "none"
              }}
              >
              Bookings
          </Button>
          <Button 
          startIcon={<UpdateIcon />} 
          onClick={() => {
              navigate('/createvenue', { state: { venueData } });
          }} 
          sx={{
              borderTop:"none"
          }}>
              Update
          </Button>
          <Button startIcon={<DeleteIcon />} onClick={(e) => handleDeleteVenue(e, data.id)} sx={{
              borderRadius:"0 0 5px 5px",
              borderTop:"none"
          }}>Delete</Button>
      </ButtonGroup>
      <Dialog onClose={handleClose} open={open} BackdropProps={{style: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}>
        <DialogTitle>Bookings</DialogTitle>
            {bookingsData.length === 0 ? (
          <DialogContent>No bookings yet</DialogContent>
          ) : (
          <DialogContent>
            <List sx={{ pt: 0 }}>
                {bookingsData.map((booking) => (
                <ListItem disableGutters key={booking.id}>
                    <ListItemText
                    primary={`Dates: ${format(new Date (booking.dateFrom), 'dd/MM/yyyy')} - ${format(new Date (booking.dateTo), 'dd/MM/yyyy')}`}
                    secondary={`ID: ${booking.id}`}
                    />
                </ListItem>
                ))}
            </List>
          </DialogContent>
          )}
        </Dialog>
      </Box>
    );
    });

  return (
    <Grid item xs={12} md={6} sx={{ p:2 }}>
      <Typography component="h1" variant="h5">
      Your Venues
      </Typography>
      { data.length === 0 ? 
        <Box key={data.id} sx={{
          width:"350px",
          margin:"auto",
          textAlign:"center"
          }}>
          <Typography variant="subtitle1">No venues created</Typography>
        </Box>: <></>}
        <Box sx={{ overflowX: 'auto'}}>
          <ImageList gap={30} sx={{ height:'auto', width:"max-content", display:'flex', px:2, flexDirection: {md:"column"} }}>
          {renderData}
          </ImageList>
        </Box>
    </Grid>
  )
}

export default ProfileVenues