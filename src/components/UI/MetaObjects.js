import React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';


const MetaObjects = ({ items }) => {
  const getIcon = (itemName) => {
    switch (itemName) {
      case 'wifi':
        return <WifiIcon/>;
      case 'parking':
        return <LocalParkingIcon/>;
      case 'breakfast':
        return <FreeBreakfastIcon/>;
      case 'pets':
        return <PetsIcon/>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      py: "20px",
      maxWidth: "360px",
      display: 'flex',
      gap: 1,
      flexWrap: 'wrap',
      justifyContent: { xs: 'space-between', sm: 'start' }
    }}>
      {Object.entries(items).map(([itemName, value]) => {
        if (value) {
          const icon = getIcon(itemName); // Get the icon based on the item name
          return (
            <Chip icon={icon} label={itemName}/>
          );
        } else {
          return null; // Don't render the item if its value is false
        }
      })}
    </Box>
  );
};

export default MetaObjects;
