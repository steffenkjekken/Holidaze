import {ImageListItem, Link, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';
import Image from 'mui-image';

export const Item = ({venue}) => {

  return (
      <Link component={RouterLink} underline="none" to={`/venues/${venue.id}`} >
        <ImageListItem>
          <Image
            src={`${venue.media[0]}`}
            srcSet={`${venue.media[0]}`}
            alt={venue.title}
            variant="rounded"
            loading="lazy"
            duration={1000}
            height="40vh"
            width="100%"
            sx={{
                borderRadius:"5px"
            }}
          />
          <Box>
            <Box sx={{
                  display:'flex',
                  justifyContent:'space-between'
              }}>
              <Typography variant="subtitle1">{venue.name}</Typography>
              <Box sx={{
                display: "flex"
              }}>
                <StarIcon color='warning' sx={{ mt:1, pt:"3px"}}/>
                <Typography variant="subtitle1" sx={{ mt:"8px"}}>{venue.rating}</Typography>
              </Box>
            </Box>
            <Typography variant="subtitle2">${venue.price}</Typography>
          </Box>
        </ImageListItem>
      </Link>
  )
};