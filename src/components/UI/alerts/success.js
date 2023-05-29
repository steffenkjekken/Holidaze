import * as React from 'react';
import {Box, Alert, IconButton, Collapse} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SuccessAlert({message}) {
  const [openAlert, setOpenAlert] = React.useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}