import React from 'react'
import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack, FormControl, Button, TextField } from '@mui/material'
import { URL, BookingsParameter } from '../utils/constants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useApi from '../../hooks/useApi';
import { useState } from 'react';
import { CreateBookingURL } from '../utils/constants';
import axios from 'axios';
import { load } from '../utils/storage';
import format from 'date-fns/format';

export const Booking = () => {
    const {id} = useParams()

    const [value] = useState(null);
    const [bookingData, setBookingData] = useState({
            venueId: id
        })
    
    const handleChange = (user, value)  => {
        setBookingData({...bookingData, [user]: value})
        console.log(value);
    }

    const options = {
        headers: {
          Authorization: `Bearer ${load('AuthToken')}`,
        },
      }

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(CreateBookingURL, bookingData, options);
          console.log(bookingData);
          console.log(response);
        } catch (error) {
          console.log(error);
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
        <Typography variant="h6" fontWeight={600}>{data.price}$ a night</Typography>
        <Stack direction="column" paddingTop={2} spacing={1}>
            <Typography variant="body2">Check Availability</Typography>
            <Stack direction={{ xs: 'row', sm: 'column', md: 'row' }} spacing={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={value} shouldDisableDate={bookedDates} onChange={(newValue) => handleChange('dateFrom', newValue.$d)} />
                <DatePicker value={value} shouldDisableDate={bookedDates} onChange={(newValue) => handleChange('dateTo', newValue.$d)} />
                </LocalizationProvider>
            </Stack>
            <Typography variant="body2" paddingTop={1}>Number of guests (Max: {data.maxGuests} )</Typography>
            <FormControl sx={{ width: 100 }}>
                <TextField
                    id="outlined"
                    type='number'
                    label="Guests"
                    onChange={(event) => handleChange('guests', event.target.valueAsNumber)}
                    />
            </FormControl>
            <Button
            onClick={handleBooking}>Book venue</Button>
        </Stack>
    </Paper>
  )
}
