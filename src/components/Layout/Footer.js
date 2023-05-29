import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const navItems = ['Venues', 'About', 'Contact', 'Rent out your Venue'];

const Footer = () => {
  return (
    <Box>
        <Typography component="h6">
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
    </Box>
  )
}

export default Footer
