import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Slider } from '@mui/material';
import useApi from '../hooks/useApi';
import { load } from '../components/utils/storage';
import { URL } from '../components/utils/constants';
import { useSelector } from 'react-redux';
import VmPopup from '../components/UI/VmPopup';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CreateVenue = () => {

    const location = useLocation();
    const { state } = location;
    const venueData = state?.venueData ?? {};
    console.log(venueData);
    const user = useSelector((state) => state.auth.user);
    const [checked, setChecked] = useState({
        wifi: state?.venueData?.meta?.wifi || false,
        parking: state?.venueData?.meta?.parking || false,
        breakfast: state?.venueData?.meta?.breakfast || false,
        pets: state?.venueData?.meta?.pets || false,
    })
    const [mediaError, setMediaError] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [guestsError, setGuestsError] = useState('');
    const [setOpenAlert] = React.useState(false);

    const token = load('AuthToken')
    const { post, put } = useApi(URL, token);

    const isUpdate = Boolean(state && state.venueData);

    const initialFormData = isUpdate ? venueData : {
        id: '',
        name: '',
        description: '',
        media: [],
        price: '',
        maxGuests: '',
        rating: 0,
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: {
          address: '',
          city: '',
          zip: '',
          country: '',
          continent: '',
          lat: 0,
          lng: 0,
        },
      };

      const [formData, setFormData] = useState(initialFormData);
      let updatedPrice = parseInt(formData.price);
      let updatedGuests = parseInt(formData.maxGuests);
      let updatedRating =  parseInt(formData.rating);

      const handleChange = (e) => {

        const { name, value, checked } = e.target;

        if (name === "media") {
            const mediaArray = value.trim() !== "" ? value.split(",").map((url) => url.trim()) : [];
            console.log(mediaArray);
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: mediaArray,
            }));
            const errors = {};
            if (!formData.name) {
                errors.name = 'Name is required';
            }
            if (!formData.price) {
                errors.price = 'Price is required';
            }
        
            // Perform media input validation
            const hasWhitespace = value.includes(' ');
            if (hasWhitespace) {
              setMediaError('URLs must be comma-separated without whitespace');
            } else {
              setMediaError('');
            }
          } else {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
          }
          if (name === 'name') {
            if (value.trim() === '') {
              setNameError('Name is required');
            } else {
              setNameError('');
            }
          } else if (name === 'description') {
            if (value.trim() === '') {
              setDescriptionError('Description is required');
            } else {
              setDescriptionError('');
            }
          } else if (name === 'price') {
            const price = parseInt(value);
            if (price <= 0) {
              setPriceError('Price must be greater than 0');
            } else {
              setPriceError('');
            }
          } else if (name === 'maxGuests') {
            const guests = parseInt(value);
            if (guests <= 0) {
              setGuestsError('Maximum guests must be greater than 0');
            } else {
              setGuestsError('');
            }
          }
        
          setChecked((prevChecked) => ({ ...prevChecked, [name]: checked }));
        };

      useEffect(() => {
        console.log(checked);
      }, [checked]);
    
    

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (mediaError) {
        console.log('Media error:', mediaError);
        return;
      }

      if (isUpdate) {
        const updatedFormData = {
            ...formData,
            price: updatedPrice,
            maxGuests: updatedGuests,
            media: formData.media.length > 0 ? formData.media.toString().split(",").map((url) => url.trim()) : [],
            rating: updatedRating,
            meta: {
              wifi: checked.wifi,
              parking: checked.parking,
              breakfast: checked.breakfast,
              pets: checked.pets,
            },
          };
          if (updatedFormData.media.length === 1 && updatedFormData.media[0] === "") {
            updatedFormData.media = [];
          }
        await put(formData.id, updatedFormData);
        console.log(typeof formData.media);
        setOpenAlert(true)
      } else {

        const formData = new FormData(e.target);
  
        const bookingData = {
        name: formData.get('name'),
        description: formData.get('description'),
        media: formData.get('media') ? formData.get('media').split(",").map((url) => url.trim()) : [],
        price: parseInt(formData.get('price')),
        maxGuests: parseInt(formData.get('guests')),
        rating: parseInt(formData.get('rating')),
        meta: {
          wifi: checked.wifi,
          parking: checked.parking,
          breakfast: checked.breakfast,
          pets: checked.pets,
        },
        location: {
          address: formData.get('address'),
          city: formData.get('city'),
          zip: formData.get('zip'),
          country: formData.get('country'),
          continent: formData.get('continent'),
          lat: parseFloat(formData.get('lat') || 0),
          lng: parseFloat(formData.get('lng') || 0),
        },
      };
  
      try {
        await post(bookingData);
        console.log('Venue created successfully!');
        setOpenAlert(true)
        // Perform any other actions or state updates upon successful creation
      } catch (error) {
        console.log('Error creating venue:', error);
      }
        
      }
  
    };

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
          value: 4,
          label: '4',
        },
        {
            value: 5,
            label: '5',
          },
      ];

  return (
    <Grid container component="main" sx={{ 
        height: 'auto',
        m: 'auto',
        p:2,
        maxWidth: "660px",
    }}>
        {user.venueManager ? ( 
            <form onSubmit={handleSubmit}>
            <Typography component="h5" sx={{
                pt:1,
                pb:3
            }}>
            {isUpdate ? 'Update venue' : 'Create venue'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Venue name"
                    fullWidth
                    variant="standard"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    error={!!nameError}
                    helperText={nameError}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="price"
                    name="price"
                    label="Price"
                    fullWidth
                    variant="standard"
                    defaultValue={formData.price}
                    onChange={handleChange}
                    error={!!priceError}
                    helperText={priceError}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    maxRows={5}
                    fullWidth
                    multiline
                    variant="standard"
                    defaultValue={formData.description}
                    onChange={handleChange}
                    error={!!descriptionError}
                    helperText={descriptionError}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="media"
                    name="media"
                    label="Media"
                    maxRows={5}
                    fullWidth
                    multiline
                    variant="standard"
                    defaultValue={formData.media.join(", ")}
                    onChange={handleChange}
                    error={!!mediaError}
                    helperText={mediaError}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="guests"
                    name="guests"
                    label="Guest"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    defaultValue={formData.maxGuests}
                    onChange={handleChange}
                    error={!!guestsError}
                    helperText={guestsError}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography id="rating-slider" gutterBottom>
                Rating
                </Typography>
                <Slider
                    aria-labelledby="rating-slider"
                    name="rating" 
                    id="rating"
                    onChange={handleChange}
                    step={1}
                    marks={marks}
                    marked="true"
                    min={0}
                    max={5}
                />
                </Grid>
                <Grid item xs={12}>
                <Typography component='h6' gutterBottom>
                Commodities
                </Typography>
                    <FormGroup  sx={{ display: 'flex', flexDirection:'row' }}>
                        <FormControlLabel 
                        control={<Checkbox 
                            defaultChecked={formData.meta.wifi} 
                            name='wifi'
                            onChange={handleChange}
                            />} 
                        label="Wifi available?"
                        sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel 
                        control={<Checkbox 
                            defaultChecked={formData.meta.parking}
                            name='parking'
                            onChange={handleChange}
                            />} 
                        label="Parking Available?"
                        sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel 
                        control={<Checkbox
                            defaultChecked={formData.meta.breakfast} 
                            name='breakfast'
                            onChange={handleChange}
                            />} 
                        label="Breakfast included?" 
                        sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel 
                        control={<Checkbox
                            defaultChecked={formData.meta.pets} 
                            name='pets'
                            onChange={handleChange}
                            />} 
                        label="Pets allowed?"
                        sx={{
                            flex: '49%'
                        }}/>
                    </FormGroup>
                </Grid>
                </Grid>
                <Typography component='h6' gutterBottom sx={{
                    mt:5
                }}>
                Location
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    variant="standard"
                    defaultValue={formData.address}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    variant="standard"
                    defaultValue={formData.city}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    defaultValue={formData.zip}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    defaultValue={formData.country}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="continent"
                    name="continent"
                    label="Continent"
                    fullWidth
                    variant="standard"
                    defaultValue={formData.continent}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={6} sm={3}>
                <TextField
                    id="lat"
                    name="lat"
                    label="Latitude"
                    fullWidth
                    variant="standard"
                    type="number" 
                    defaultValue={formData.lat}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={6} sm={3}>
                <TextField
                    id="lng"
                    name="lng"
                    label="Longitude"
                    fullWidth
                    variant="standard"
                    type="number" 
                    defaultValue={formData.lng}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" type="submit">{isUpdate ? 'Update' : 'Create'}</Button>
                </Grid>
            </Grid>
            </form>
        
        )
        :
        ( 
            <VmPopup/>
        )}
      </Grid>
      );
}

export default CreateVenue