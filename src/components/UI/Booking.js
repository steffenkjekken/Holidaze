import React from 'react'
import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack, FormControl, Button, TextField, Alert } from '@mui/material'
import { URL, BookingsParameter } from '../utils/constants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useApi from '../../hooks/useApi';
import { useState } from 'react';
import { BookingURL } from '../utils/constants';
import axios from 'axios';
import format from 'date-fns/format';
import { options } from '../utils/constants';
import { useSelector } from 'react-redux';

export const Booking = () => {
    const {id} = useParams()
    const auth = useSelector((state) => state.auth.auth);

    const [value] = useState(null);
    const [bookingData, setBookingData] = useState({
            venueId: id
        })

    const [bookingError, setBookingError] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleChange = (user, value)  => {
        setBookingData({...bookingData, [user]: value})
        if (value && value.$d instanceof Date) {
          const formattedDate = format(value.$d, "yyyy-MM-dd");
          console.log(formattedDate);
          setBookingData((prevState) => ({
            ...prevState,
            [user]: formattedDate,
          }));
        }
        console.log(bookingData.dateFrom);
    }

    const handleBooking = async (e) => {
        e.preventDefault();

        if (
          bookingData.guests === null ||
          bookingData.guests === undefined ||
          bookingData.guests === ''
        ) {
          setBookingError('Please fill in the guests field.');
          return;
        }

        if (
          bookingData.dateFrom === null ||
          bookingData.dateFrom === undefined ||
          bookingData.dateFrom === ''
        ) {
          setBookingError('You have to select a from date');
          return;
        }

        if (
          bookingData.dateTo === null ||
          bookingData.dateTo === undefined ||
          bookingData.dateTo === ''
        ) {
          setBookingError('You have to select a to date');
          return;
        }
    
        try {
          const response = await axios.post(BookingURL, bookingData, options);
          console.log(bookingData);
          console.log(response);
          setBookingSuccess(true);
          setBookingError('');
        } catch (error) {
          console.log(error);
          setBookingSuccess(false);
          setBookingError('An error occurred while processing the booking.');
        }      
    };

    const { data, isLoading, isError } = useApi(URL + "/" + id + BookingsParameter);

    if (isLoading) {
        return <span className="visually-hidden">Loading...</span>;   
    };
      if (isError) {
        return <div>Error</div>;
      };

    const startDate = data.bookings.map((a) => new Date(a.dateFrom));
    const endDate = data.bookings.map((a) => new Date(a.dateTo));

    function getDatesInRange(startDate, endDate) {
        const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
        const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
        
        const date = new Date(start.getTime());
        
        const dates = [];
        
        while (date <= end) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
        }
    
     return dates;
    }

    const daysBooked = []

    for (let i = 0; i < startDate.length; i++) {
        const days = getDatesInRange(startDate[i], endDate[i])
        daysBooked.push(days);
      }

    const formatted = daysBooked.map(dateArray =>
        dateArray.map(date =>
          date = format(date, "yyyy-MM-dd")
        )
      );

    
      const newArray = Array.prototype.concat.apply([], formatted);
      
      //console.log(newArray);

      const bookedDates = (date) => {
        return newArray.includes(date.format("YYYY-MM-DD"));
      };
      

  return (
    <Paper elevation={2} sx={{
        border:"0.5px solid black",
        borderRadius:"5px",
        backgroundColor:"white",
        padding: "10px",
        position: {sm: "sticky"},
        top: {sm: "15px"}
    }}>
      <Typography component="h6" fontWeight={600}>{data.price}$ a night</Typography>
        <Stack direction="column" paddingTop={2} spacing={1}>
            <Typography variant="body2">Check Availability</Typography>
            <Stack direction={{ xs: 'row', sm: 'column', md: 'row' }} spacing={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                  value={value} 
                  format="DD-MM-YYYY" 
                  shouldDisableDate={bookedDates} 
                  onChange={(newValue) => handleChange('dateFrom', new Date(newValue.$d).toLocaleDateString())}
                  />
                  <DatePicker 
                  value={value} 
                  format="DD-MM-YYYY" 
                  shouldDisableDate={bookedDates}
                  onChange={(newValue) => handleChange('dateTo', new Date(newValue.$d).toLocaleDateString())}
                  />
                </LocalizationProvider>
            </Stack>
            <Typography variant="body2" paddingTop={1}>Number of guests (Max: {data.maxGuests} )</Typography>
            <FormControl sx={{ width: 100 }}>
                <TextField
                    id="outlined"
                    required
                    type='number'
                    label="Guests"
                    InputProps={{ inputProps: { min: 0, max: data.maxGuests } }}
                    onChange={(event) => handleChange('guests', event.target.valueAsNumber)}
                    helperText={bookingData.guests > data.maxGuests ? "Exceeded maximum guests" : "" || 
                    bookingData.guests === 0 || "" ? "Please fill out field" : ""}
                    sx={{
                      '& p':{
                        color:'blue',
                        width: 'max-content',
                        ml: 0
                      },
                    }}
                    />
            </FormControl>
            {bookingSuccess && <Alert severity='success'>Booking was succesfully done</Alert>}
            {bookingError && <Alert severity='error'>{bookingError}</Alert>}
            {auth ? 
            <Button variant="contained"
            onClick={handleBooking}>Book venue</Button> : 
            <Button color='primary' variant="contained"  disabled>Log in to book</Button>}
        </Stack>
    </Paper>
  )
}
