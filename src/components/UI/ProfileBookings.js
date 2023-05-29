import React from 'react'
import { BookingsByProfile, BookingURL } from '../utils/constants';
import useApi from '../../hooks/useApi';
import { load } from '../utils/storage';
import { Box, Grid, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import format from 'date-fns/format';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

const ProfileBookings = () => {

    const token = load('AuthToken')

    const { data, isLoading, isError, refresh} = useApi(BookingsByProfile, token);
    const { del } = useApi(BookingURL, token);

    const handleDeleteBooking = async (e, venueId) => {
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



    //console.log(data);

    const renderData = data.map((data) => {
    const { id, created, dateFrom, dateTo, guests, venue } = data;

    if (isLoading) {
        return < CircularProgress color="secondary"  key={id} />;
        }
        
        if (isError) {
        return <div  key={id}>Error</div>;
        }
    
        if (!data) {
        return  <div  key={id}>Data is loading</div>;
        }
    
    return (
        <Accordion key={id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > <Box sx={{
            display:'flex',
            flexDirection:'column'
        }}>
          <Typography sx={{ flexShrink: 0 }}>{venue.name}</Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {format(new Date (dateFrom), 'dd/MM/yyyy')} - {format(new Date (dateTo), 'dd/MM/yyyy')}
            </Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
        <CardMedia
            sx={{ height: 140, borderRadius:"5px" }}
            image={venue.media[0]}
            title={venue.name}
        />
        <CardContent sx={{
            pb:0
        }}>
            <Box sx={{
                display:'flex',
                justifyContent:'space-between'
            }}>
            <Typography gutterBottom component="h5">
            {venue.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align='right' sx={{ width:"100%"}}>
            Booked: {format(new Date (created), 'dd/MM/yyyy')}
            </Typography>
            </Box>
            <Box sx={{
                pb: 1
            }}>
            <Typography variant="subtitle2" color="text.primary">
            From: {format(new Date (dateFrom), 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
            To: {format(new Date (dateTo), 'dd/MM/yyyy')}
            </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
            Guests: {guests}
            </Typography>
        </CardContent>
        <CardActions>
            <Box sx={{ml:"auto"}}>
                <Button variant='outlined' startIcon={<DeleteIcon />} onClick={(e) => handleDeleteBooking(e, id)}>Delete</Button>
            </Box>
        </CardActions>
        </AccordionDetails>
      </Accordion>
    );
    });



  return (
        <Grid item xs={12} md={6} sx={{ p:2 }}>
            <Typography component="h1" variant="h5" sx={{ pb:2}}>
            Your Bookings
            </Typography>
            {renderData}
        </Grid>
  )
}

export default ProfileBookings