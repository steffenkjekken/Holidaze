import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


const Footer = () => {
  return (
    <Box sx={{
      backgroundColor: "#F64A4A",
      py:1,
      mt:3
    }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'space-around', alignItems: 'baseline' }}>
        <Typography component="h6" sx={{
          color: "white"
        }}>
          Holidaze
        </Typography>
        </Box>
    </Box>
  )
}

export default Footer
