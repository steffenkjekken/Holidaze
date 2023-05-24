import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Slider } from '@mui/material';
import useApi from '../hooks/useApi';
import { load } from '../components/utils/storage';
import { URL } from '../components/utils/constants';
import { useSelector } from 'react-redux';
import VmPopup from '../components/UI/VmPopup';

const CreateVenue = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user.venueManager);

    const token = load('AuthToken')

    const { post } = useApi(URL, token);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
  
      const venueData = {
        name: formData.get('name'),
        description: formData.get('description'),
        media: [formData.get('media')],
        price: parseInt(formData.get('price')),
        maxGuests: parseInt(formData.get('guests')),
        rating: parseInt(formData.get('rating')),
        meta: {
          wifi: formData.get('wifi') === 'true',
          parking: formData.get('parking') === 'true',
          breakfast: formData.get('breakfast') === 'true',
          pets: formData.get('pets') === 'true',
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
        await post(venueData);
        console.log('Venue created successfully!');
        // Perform any other actions or state updates upon successful creation
      } catch (error) {
        console.log('Error creating venue:', error);
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
            <Typography variant="h6" gutterBottom>
                Shipping address
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
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="media"
                    name="media"
                    label="Media"
                    maxRows={5}
                    fullWidth
                    multiline
                    variant="standard"
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
                    defaultValue={0}
                    step={1}
                    marks={marks}
                    marked
                    min={0}
                    max={5}
                />
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom>
                Commodities
                </Typography>
                    <FormGroup  sx={{ display: 'flex', flexDirection:'row' }}>
                        <FormControlLabel control={<Checkbox />} label="Wifi available?" sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel control={<Checkbox />} label="Parking Available?" sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel control={<Checkbox/>} label="Breakfast included?" sx={{
                            flex: '49%'
                        }}/>
                        <FormControlLabel control={<Checkbox/>} label="Pets allowed?" sx={{
                            flex: '49%'
                        }}/>
                    </FormGroup>
                </Grid>
                </Grid>
                <Typography variant='h6' gutterBottom sx={{
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
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    variant="standard"
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
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="continent"
                    name="continent"
                    label="Continent"
                    fullWidth
                    variant="standard"
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
                />
                </Grid>
                <Grid item xs={12}>
                <button type="submit">Create Venue</button>
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