import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import BottomNavigation from '@mui/material/BottomNavigation'

const navItems = ['Venues', 'About', 'Contact', 'Rent out your Venue'];

const Footer = () => {
  return (
    <BottomNavigation>
        <Typography variant="h6">
         Holidaze
       </Typography>
        <Toolbar>
       <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'space-around', alignItems: 'baseline' }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#000' }}>
              {item}
            </Button>
          ))}
        </Box>
     </Toolbar>
    </BottomNavigation>
  )
}

export default Footer
