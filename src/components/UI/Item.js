import {ImageListItem, Link, ImageListItemBar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Image from 'mui-image';

export const Item = ({venue}) => {

  return (
        <Link component={RouterLink} to={`/venues/${venue.id}`}>
        <ImageListItem key={venue.id}>
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
          <ImageListItemBar
            title={venue.name}
            subtitle={<span>by: {venue.author}</span>}
            position="below"
          />
        </ImageListItem>
        </Link>
  )
};